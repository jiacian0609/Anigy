import React, { useState } from "react";
import styled from 'styled-components';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Select, Input } from 'antd';

import SubmitButton from "../components/SubmitButton";

const { TextArea } = Input;

const Container = styled.div `
    width: 100%;
    height: 100%;

    padding: 30px 50px;
`

const Title = styled.div `
    font-size: 27px;
    font-weight: bold;
    color: #619E5C;
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
    const [post, setPost] = useState({
        sex: 'M',
        neutured: true
    });


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
                                className="avatar-uploader"
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
                            ></Select>
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0
                                }}
                            ></Input>
                        </SubColumn>
                        <SubColumn>
                            <Text>品種</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                            ></Select>
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0
                                }}
                            ></Input>
                        </SubColumn>
                    </Row>
                    
                    {/* 年齡 & 地區 */}
                    <Row>
                        <SubColumn>
                            <Text>年齡</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                            ></Select>
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0
                                }}
                            ></Input>
                        </SubColumn>
                        <SubColumn>
                            <Text>地區</Text>
                            <Select
                                style={{ width: '100%', marginBottom: '10px' }}
                            ></Select>
                            <Input
                                bordered={false}
                                placeholder='自行輸入...'
                                style={{
                                    width: '100%', 
                                    borderBottom: 'solid 1px #ECECEC',
                                    borderRadius: 0
                                }}
                            ></Input>
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
                                defaultValue='M'
                                onChange={value => setPost({...post, sex: value})}
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
                                defaultValue={true}
                                onChange={value => setPost({...post, neutured: value})}
                            />
                        </SubColumn>
                    </Row>
                    <div>
                        <Text>聯絡資訊</Text>
                        <Input></Input>
                    </div>
                    <div>
                        <Text>外觀特徵</Text>
                        <TextArea
                            showCount
                            style={{ height: 250, marginBottom: 24, resize: 'none' }}
                        >
                        </TextArea>
                    </div>
                    <SubmitButton name='新增貼文' />
                </FormColumn>
            </FormContainer>
        </Container>
    )
}

export default Create;