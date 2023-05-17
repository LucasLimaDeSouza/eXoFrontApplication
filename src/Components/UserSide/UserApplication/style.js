import styled from "styled-components";

// type BoxInputs = {
//     children: React.ReactNode
// }

export const BoxInputs = styled.section`

    height: 5.8rem;
    /* width: 100%; */
    margin-top: 3.8rem;
    margin-bottom: 2.8rem;
    display: flex;
    gap: 11.6rem;

    .BoxInputs {

        display: flex;
        align-items: center;
        width: 37.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .input {
        width: 17.6rem;
        height: 2.2rem;
        width: 17.6rem;
        border: none;
        font-family: 'inter';
        font-weight: 400;
        border: none;
        ::placeholder{
            color: yellow;
            padding-left: 10px;

        }
    }
    
    .inputP {
        font-weight: 400;
        font-size: medium;
        border: none;
        width: 17.6rem;
        padding: 7px 13px;
        height: 2.2rem;
        border: none;
        
    }

    .input:last-child {
        padding: 0;
    }
    
    .input::placeholder {
        font-weight: 600;
        color: #A7A7A7;
    }

    .inputP:required {
        border: none;
    }
    .inputP:required:invalid {
        content: "Por favor, preencha este campo.";
        border: red 1px solid;
        display: block;
        margin-top: 5px;
    }
    .inputP:required:valid {
        border: 2px solid #10A0E6;
    }
    
    .BoxButtons {
        
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 12rem;
        gap: 1rem;
    }

    button{
        width: 10rem;
        height: 3.2rem;
        border: none;
        background: white;
        font-weight: 500;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    button:last-child:hover{
        color: #10A0E6;
        background: white;
        border: solid 2px #10A0E6;
    }
    
    button:last-child{
        width: 24rem; 
        color: white;
        background: #10A0E6;
    }


`

export const BoxTable = styled.table`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 18rem;
    margin-top: 3rem;

    overflow: auto;

`
// export const SpaceCard = styled.div`
//     width: 100%;
//     margin-top: 2.5rem;

// `



