import React, { useState } from 'react';
import { InventoryCreate } from '../../store/inventory/types';

interface CartItemsProps {
    onCreate: (data:InventoryCreate) => void
}


const CreateItems:React.FC<CartItemsProps> = ({onCreate}) => {

    const [inputData, setInputData] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
        brand: '',
        currentInventory: '',
    });

    const [image2, setImage] = useState('')

    const changeInput = (e :any) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const style = {
        width: '600px',
        margin: '20px',
        padding: '10px',
        border: '3px solid black'
    }

    // return 되기 전 onSubmit으로 아래 코드 실행
    const onSubmit = () => {
        // name, price 값이 없을 시 
        if( !inputData.name || !inputData.price ) {
            return alert("이름과 가격은 필수 기입")
        }
        else {
            console.log('dd',inputData)
        }

        // 데이터를 한번에 모아서 전송
        onCreate({
            name:String(inputData.name),price:String(inputData.price), image:String(inputData.image), description:String(inputData.description),
            brand:String(inputData.brand), currentInventory:Number(inputData.currentInventory), 
        })

        setImage('')
    }

     // form이 실행됨과 동시에 초기화면으로 돌아오는 것(새로고침과 유사)을 막음
    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    // onChange으로 input값의 내용 변경 감지
    return (
        <div  style={style}>
            <form onSubmit={handleSubmit}>
            <label>
                ItemName:
            <input  name="name"
                value={inputData.name}
                onChange={changeInput}
                placeholder="name"
            />
            <br/>
            </label>
            &nbsp;&nbsp;
            <label>
                ItemPrice:
            <input  name="price"
                value={inputData.price}
                onChange={changeInput}
                placeholder="price"
            />
            &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemFile:
            <input
                type='file'
                name= {inputData.image}
                accept="image/png, image/jpeg"
                placeholder="imageFile"
                //@ts-ignore
                onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} // ignore로 인해 코드오류 무시
            />     
            &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemImage:  
            <input  name="image"
                value={inputData.image}
                onChange={changeInput}
                placeholder="image"
            />       
            &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemDescription:              
            <input  name="description"
                value={inputData.description}
                onChange={changeInput}
                placeholder="description"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemBrand:  
            <input  name="brand"
                value={inputData.brand}
                onChange={changeInput}
                placeholder="brand"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemCurrentInventory:  
            <input  name="currentInventory"
                value={inputData.currentInventory}
                onChange={changeInput}
                placeholder="currentInventory"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <button onClick={onSubmit} >추가</button>
            </form>
        </div>
    );
}

export default CreateItems;