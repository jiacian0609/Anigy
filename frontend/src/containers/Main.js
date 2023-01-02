import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Select } from "antd";

import PostButton from "../components/PostButton";

import { api } from "../api";

const Container = styled.div `
    width: 100%;
    position: relative;
`

const SearchButton = styled.div `
    height: 30px;

    margin-right: ${props => props.search ? '30px' : '70px'};
    padding: 10px;

    background-color: rgba(224, 224, 224, 0.4);
    border-radius: 20px;

    position: absolute;
    right: 40px;
    top: 20px;

    display: flex;
    align-items: center;
    gap: 10px;
    
    cursor: pointer;

    font-size: 20px;
    
`

const Banner = styled.div `
    width: 100%;
    height: 300px;

    padding: 130px 0 0 90px;

    background-image: url('/images/main_img.png');
    background-size: cover;

    color: white;
    font-size: 26px;
    line-height: 40px;
`

const SearchContainer = styled.div `
    width: 100%;
    height: 300px;
    padding: 50px;

    background-image: url('/images/main_img.png');
    background-size: cover;

    display: flex;
    gap: 20px;
    align-items: flex-end;
`

const SelectField = styled.div `
    // width: 200px;

    color: white;
    font-size: 20px;

    display: flex;
    align-items: center;
    gap: 10px;
`

const PostContainer = styled.div `
    margin: 0 auto;
    padding: 20px 80px;

    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`

function Main() {
    const [searchMode, setSearchMode] = useState(false);
    const [filter, setFilter] = useState({
        animals: [],
        breeds: [],
        ages: [],
        locations: []
    });
    const [animalFilter, setAnimalFilter] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.getAllPost()
        .then(res => setPosts(res.data));
    }, []);

    useEffect(() => {
        api.getFilter()
        .then(res => {
            setFilter({
                animals: [{value: 'All', label: '全部'}, ...res.data.animals.map(item => { return {value: item.animal, label: item.animal} })],
                breeds: [{value: 'All', label: '全部'}],
                ages: [{value: 'All', label: '全部'}, ...res.data.ages.map(item => { return {value: item, label: item} })],
                locations: [{value: 'All', label: '全部'}, ...res.data.locations.map(item => { return {value: item, label: item} })],
            })
            setAnimalFilter(res.data.animals)
        });
    }, []);

    return (
        <Container>
            <SearchButton search={searchMode} onClick={() => setSearchMode(!searchMode)}>
                <img alt='search' src='/icons/search.png' style={{width: '20px', height: '20px'}}/>
                {searchMode ? '取消搜尋' : '搜尋'}
            </SearchButton>
            {searchMode ? 
                <SearchContainer show={searchMode}>
                    <SelectField>
                        動物
                        <Select
                            style={{ minWidth: '90px' }}
                            options={filter.animals}
                            defaultValue='All'
                            onChange={value => {
                                if (value === 'All')
                                    setFilter({
                                        ...filter,
                                        breeds: [{value: 'All', label: '全部'}],
                                    })
                                else
                                    setFilter({
                                        ...filter,
                                        breeds: [
                                            {value: 'All', label: '全部'}, 
                                            ...animalFilter.filter(item => item.animal === value)[0].breeds
                                            .map(item => { return {value: item, label: item} })
                                        ]
                                    });
                            }}
                        />
                    </SelectField>
                    <SelectField>
                        品種
                        <Select
                            style={{ minWidth: '90px' }}
                            options={filter.breeds}
                            defaultValue='All'
                            // onChange={value => setPost({...post, sex: value})}
                        />
                    </SelectField>
                    <SelectField>
                        性別
                        <Select
                            style={{ width: '90px' }}
                            options={[
                                {
                                    value: 'All',
                                    label: '全部'
                                },
                                {
                                    value: 'M',
                                    label: '公'
                                },
                                {
                                    value: 'F',
                                    label: '母'
                                }
                            ]}
                            defaultValue='All'
                            // onChange={value => setPost({...post, sex: value})}
                        />
                    </SelectField>
                    <SelectField>
                        結紮
                        <Select
                            style={{ width: '90px' }}
                            options={[
                                {
                                    value: 'All',
                                    label: '全部'
                                },
                                {
                                    value: true,
                                    label: '是'
                                },
                                {
                                    value: false,
                                    label: '否'
                                }
                            ]}
                            defaultValue='All'
                            // onChange={value => setPost({...post, sex: value})}
                        />
                    </SelectField>
                    <SelectField>
                        年齡
                        <Select
                            style={{ minWidth: '90px' }}
                            options={filter.ages}
                            defaultValue='All'
                            // onChange={value => setPost({...post, sex: value})}
                        />
                    </SelectField>
                    <SelectField>
                        地區
                        <Select
                            style={{ minWidth: '90px' }}
                            options={filter.locations}
                            defaultValue='All'
                            // onChange={value => setPost({...post, sex: value})}
                        />
                    </SelectField>
                </SearchContainer>
                :
                <Banner>
                    <div>你的全世界有很多精彩，</div>
                    <div style={{marginLeft: '70px'}}>牠的全世界卻只有你。</div>
                </Banner>
            }
            <PostContainer>
            {posts.map(p => 
                <PostButton 
                    key={p._id}
                    post={p}
                />)}
            </PostContainer>
        </Container>
    )
}

export default Main;