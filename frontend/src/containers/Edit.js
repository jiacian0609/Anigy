import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { toast } from "react-toastify";
import _ from "lodash";

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Select, Input, Radio } from 'antd';

import SubmitButton from "../components/SubmitButton";

import { api } from "../api";
import { uploadImage } from "../firebase/upload";

const { TextArea } = Input;

const Container = styled.div `
    width: 100%;
    height: 100%;

    padding: 30px 50px;
`

const Title = styled.div `
    font-size: 27px;
    font-weight: bold;
    color: #365A33;
    margin-left: 50px;
`

const FormContainer = styled.div `
    width: 100%;
    padding-left: 80px;
    display: flex;
    gap: 10px;
`

const FormColumn = styled.div `
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Row = styled.div `
    width: 100%;
    display: flex;
    // justify-content: space-between;
    gap: 10px;
`

const SubColumn = styled.div `
    width: 50%;
`

const OtherImages = styled.div `
    width: 220px;
    display: flex;
    flex-wrap: wrap;
`

const Text = styled.div `
    margin-bottom: 10px;
`

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        toast.error('僅能上傳 JPG 或 PNG 檔案');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        toast.error('檔案必須小於 2MB');
    }

    return isJpgOrPng && isLt2M;
};

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [coverImage, setCoverImage] = useState('');
    const [images, setImages] = useState([]);
    const [filter, setFilter] = useState({
        animals: [],
        breeds: [],
        ages: [],
        locations: []
    });
    const [animalFilter, setAnimalFilter] = useState([]);
    const [showText, setShowText] = useState({
        animals: false,
        breeds: false,
        ages: false,
        locations: false
    });
    const [post, setPost] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            toast.error('請先登入');
            navigate('/signIn');
        }

        api.getPostDetail(id)
        .then(res => {
            if (res.role !== 'WRITE') {
                toast.error('沒有編輯權限');
                navigate('/');
            }
            setPost({...res.data, role: res.role});
            setCoverImage({
                url: res.data.cover_image
            });
            setImages(res.data.images.map(image => {return {url: image}}));
        })
        .catch(err => {
            console.log(err);
            window.location.href = '/404';
        });

        api.getFilter()
        .then(res => {
            setFilter({
                animals: [...res.data.animals.map(item => { return {value: item.animal, label: item.animal} }), {value: 'Others', label: '其他'}],
                // breeds: [{value: 'All', label: '全部'}],
                ages: [ ...res.data.ages.map(item => { return {value: item, label: item} }), {value: 'Others', label: '其他'}],
                locations: [ ...res.data.locations.map(item => { return {value: item, label: item} }), {value: 'Others', label: '其他'}],
            });
            setAnimalFilter(res.data.animals);
        });
    }, []);


    const handleCoverImageChange = ({file}) => {
        setCoverImage({
            name: file.name,
            file: file.originFileObj,
            url: URL.createObjectURL(file.originFileObj)
        });
    };

    const handleImagesChange = ({fileList}) => {
        setImages(fileList.map(file => {
            try{ 
                file.file = file.originFileObj;
                file.url = URL.createObjectURL(file.originFileObj);
                file.status = '';
                return file;
            } catch (e) {
                return file;
            }
        }));
    };

    const handlePostChange = (payload) => {
        setPost({
            ...post,
            ...payload
        });
    };

    const onSubmit = async () => {
        if(_.isEmpty(coverImage)) {
            toast.error('請選擇封面照片');
            return;
        }

        const coverImageUrl = await uploadImage(coverImage);
        const imagesUrl = await Promise.all(
            images.map(async image => await uploadImage(image))
        );

        await api.editPost(id, {
            ...post,
            cover_image: coverImageUrl,
            images: imagesUrl
        })
        .then(res => {
            toast.success(res.message);
            navigate(`/post/${id}`);
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{marginTop: 8}}>
                Upload
            </div>
        </div>
    );

    return (
        <Container>
            <Title>新增送養貼文</Title>
            <FormContainer>
                <FormColumn>
                    {/* 照片 */}
                    <Row>
                        <SubColumn>
                            <Text>封面照片</Text>
                            <Upload
                                name="coverImage"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleCoverImageChange}
                            >
                                {coverImage ? (
                                    <img
                                        src={coverImage.url}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : uploadButton}
                            </Upload>
                        </SubColumn>
                        <SubColumn>
                            <OtherImages>
                                <Text>其他照片</Text>
                                <Upload
                                    listType="picture-card"
                                    fileList={images}
                                    beforeUpload={beforeUpload}
                                    onChange={handleImagesChange}
                                >
                                    {images.length >= 4 ? null : uploadButton}
                                </Upload>
                            </OtherImages>
                        </SubColumn>
                    </Row>
                    {/* 動物 & 品種 */}
                    <Row>
                        <SubColumn>
                            <Text>動物</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                                value={post.animal}
                                options={filter.animals}
                                placeholder='請選擇...'
                                onChange={value => {
                                    if (value === 'Others') {
                                        setPost(curPost => {
                                            const {animal, ...rest} = curPost;
                                            return rest;
                                        });
                                        setFilter({
                                            ...filter,
                                            breeds: [{value: 'Others', label: '其他'}],
                                        });
                                        setShowText({
                                            ...showText,
                                            animals: true
                                        });
                                    }
                                    else {
                                        handlePostChange({animal: value});
                                        setFilter({
                                            ...filter,
                                            breeds: [
                                                ...animalFilter.filter(item => item.animal === value)[0].breeds
                                                .map(item => { return {value: item, label: item} }),
                                                {value: 'Others', label: '其他'}
                                            ]
                                        });
                                        setShowText({
                                            ...showText,
                                            animals: false
                                        });
                                    }
                                }}
                            />
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0,
                                    visibility: showText.animals ? '' : 'hidden'
                                }}
                                onChange={e => {
                                    if (e.target.value === '')
                                        setPost(curPost => {
                                            const {animal, ...rest} = curPost;
                                            return rest;
                                        });
                                    else
                                        handlePostChange({animal: e.target.value});
                                }}
                            />
                        </SubColumn>
                        <SubColumn>
                            <Text>品種</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                                value={post.breed}
                                options={filter.breeds}
                                placeholder='請選擇...'
                                onChange={value => {
                                    if (value === 'Others') {
                                        setPost(curPost => {
                                            const {breed, ...rest} = curPost;
                                            return rest;
                                        });
                                        setShowText({
                                            ...showText,
                                            breeds: true
                                        });
                                    }
                                    else {
                                        handlePostChange({breed: value});
                                        setShowText({
                                            ...showText,
                                            breeds: false
                                        });
                                    }
                                }}
                            />
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0,
                                    visibility: showText.breeds ? '' : 'hidden'
                                }}
                                onChange={e => {
                                    if (e.target.value === '')
                                        setPost(curPost => {
                                            const {breed, ...rest} = curPost;
                                            return rest;
                                        });
                                    else
                                        handlePostChange({breed: e.target.value});
                                }}
                            />
                        </SubColumn>
                    </Row>               
                    {/* 年齡 & 地區 */}
                    <Row>
                        <SubColumn>
                            <Text>年齡</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                                value={post.age}
                                options={filter.ages}
                                placeholder='請選擇...'
                                onChange={value => {
                                    if (value === 'Others') {
                                        setPost(curPost => {
                                            const {age, ...rest} = curPost;
                                            return rest;
                                        });
                                        setShowText({
                                            ...showText,
                                            ages: true
                                        });
                                    }
                                    else {
                                        handlePostChange({age: value});
                                        setShowText({
                                            ...showText,
                                            ages: false
                                        });
                                    }
                                }}
                            />
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0,
                                    visibility: showText.ages ? '' : 'hidden'
                                }}
                                onChange={e => {
                                    if (e.target.value === '')
                                        setPost(curPost => {
                                            const {age, ...rest} = curPost;
                                            return rest;
                                        });
                                    else
                                        handlePostChange({age: e.target.value});
                                }}
                            />
                        </SubColumn>
                        <SubColumn>
                            <Text>地區</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                                value={post.location}
                                options={filter.locations}
                                placeholder='請選擇...'
                                onChange={value => {
                                    if (value === 'Others') {
                                        setPost(curPost => {
                                            const {location, ...rest} = curPost;
                                            return rest;
                                        });
                                        setShowText({
                                            ...showText,
                                            locations: true
                                        });
                                    }
                                    else {
                                        handlePostChange({location: value});
                                        setShowText({
                                            ...showText,
                                            locations: false
                                        });
                                    }
                                }}
                            />
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0,
                                    visibility: showText.locations ? '' : 'hidden'
                                }}
                                onChange={e => {
                                    if (e.target.value === '')
                                        setPost(curPost => {
                                            const {location, ...rest} = curPost;
                                            return rest;
                                        });
                                    else
                                        handlePostChange({location: e.target.value});
                                }}
                            />
                        </SubColumn>
                    </Row>
                </FormColumn>
                <FormColumn>
                    {/* 性別 & 結紮 */}
                    <Row>
                        <SubColumn>
                            <Text>性別</Text>
                            <Select
                                style={{ width: '100%' }}
                                value={post.sex}
                                options={[
                                    {
                                        value: 'M',
                                        label: '公'
                                    },
                                    {
                                        value: 'F',
                                        label: '母'
                                    }
                                ]}
                                placeholder='請選擇...'
                                onChange={value => handlePostChange({sex: value})}
                            />
                        </SubColumn>
                        <SubColumn>
                            <Text>結紮</Text>
                            <Select
                                style={{ width: '100%' }}
                                value={post.neutered}
                                options={[
                                    {
                                        value: true,
                                        label: '是'
                                    },
                                    {
                                        value: false,
                                        label: '否'
                                    }
                                ]}
                                placeholder='請選擇...'
                                onChange={value => handlePostChange({neutered: value})}
                            />
                        </SubColumn>
                    </Row>
                    <div>
                        <Text>聯絡資訊</Text>
                        <Radio.Group onChange={e => handlePostChange({contact: e.target.value})} value={post.contact}>
                            <Radio value='mobile'>電話</Radio>
                            <Radio value='email'>E-mail</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <Text>外觀特徵</Text>
                        <TextArea
                            showCount
                            style={{ height: 250, marginBottom: 24, resize: 'none' }}
                            value={post.other_info}
                            onChange={e => {
                                if (e.target.value === '')
                                    setPost(curPost => {
                                        const {other_info, ...rest} = curPost;
                                        return rest;
                                    });
                                else
                                    handlePostChange({other_info: e.target.value});
                            }}
                        />
                    </div>
                    <SubmitButton name='編輯貼文' onClick={onSubmit}/>
                </FormColumn>
            </FormContainer>
        </Container>
    )
}

export default Edit;