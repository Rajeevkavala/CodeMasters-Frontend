import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <React.Fragment>
        <Wrapper>
            <img src="https://raw.githubusercontent.com/thapatechnical/reactmultipage/b27bff8403d3729dcd652cff79d85c878a3f211a/public/images/error.svg" alt="error" />
            <h1>Page Not Found</h1>
            <Link to='/'>
                <button className='button-29'>Go Back</button>
            </Link>
        </Wrapper>
    </React.Fragment>
  )
}

const Wrapper = styled.section`
    img{
        width:50%;
    }
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding:1.6rem 0;

    @media (max-width: 425px){
        padding:9.6rem 0;
        .button-29{
            margin-block:10rem;
        }
    }

    .button-29 {
    margin-block:2rem;
    align-items: center;
    appearance: none;
    background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono",monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
    }

    .button-29:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    }

    .button-29:hover {
    box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    .button-29:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
    }
`;

export default Error