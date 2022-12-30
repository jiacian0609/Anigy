import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Select, Input, Radio } from 'antd';

import SubmitButton from "../components/SubmitButton";

import { api } from "../api";

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

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

function Create() {
    const [loading, setLoading] = useState(false);
    const [coverImage, setCoverImage] = useState();
    const [images, setImages] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-xxx',
          percent: 50,
          name: 'image.png',
          status: 'uploading',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
    ]);
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


    const handleCoverImageChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setCoverImage(url);
            });
        }
    };

    const handleImagesChange = ({ fileList: newFileList }) => setImages(newFileList);

    const handlePostChange = (payload) => {
        setPost({
            ...post,
            ...payload
        });
    };

    const onSubmit = async () => {

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
                                // className="avatar-uploader"
                                showUploadList={false}
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleCoverImageChange}
                            >
                                {coverImage ? (
                                    <img
                                        src={coverImage}
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
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={images}
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
                                onChange={value => handlePostChange({neutured: value})}
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
                            onChange={e => {
                                if (e.target.value === '')
                                    setPost(curPost => {
                                        const {others, ...rest} = curPost;
                                        return rest;
                                    });
                                else
                                    handlePostChange({others: e.target.value});
                            }}
                        />
                    </div>
                    <SubmitButton name='新增貼文' onClick={onSubmit}/>
                </FormColumn>
            </FormContainer>
        </Container>
    )
}

export default Create;