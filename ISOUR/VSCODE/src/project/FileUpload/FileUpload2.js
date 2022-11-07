import React, {Component, useEffect, useState} from 'react';
import axios from 'axios'; // npm install axios



function FileUpload() {
  const localId = window.localStorage.getItem("userId");
  const [ files, SetFiles ] = useState('');
  const [ previewImg, setPreviewImg ] = useState(null) 
  
  
  // 이거 되는거!!!!!
  const onFileUpload = (e) => {
    SetFiles(e.target.files[1]);
    console.log("이거!" + files);
  }

  // 프리뷰 만들다가 포기
  // const onFileUpload = (e) => {

  //   const reader = new FileReader()
  //   if(e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0])
  //     SetFiles(e.target.files[0]);
  //     console.log("이거!" + files);
  //   }
  //   reader.onloadend = () => {
  //     const previewImgUrl = setPreviewImg(reader.result)

  //     // if(previewImgUrl) {
  //     //   setPreviewImg([...previewImg, previewImgUrl])
  //     // }
  //     console.log(previewImgUrl)
  //   }
  // };


  const handleClick = () => {
    const formData = new FormData();
    formData.append('Id', localId);
    formData.append('uploadImage', files);
    

    for(let value of formData.values()) {
      console.log(value);
    }

    const config = {
      Header: {
        'content-type': 'multipart/form-data',
      },
    };
    // https://bewci01vce.execute-api.ap-northeast-2.amazonaws.com/prod/isour-file-upload
    // http://localhost:8090/ISOUR/UploadService
    axios.post('http://localhost:8111/ISOUR/UploadService', formData, config).then(() => { // API Gateway URL 입력
      console.log(localId);
    });
  };

    return (
      <div className='upload_wrap'>
        <div className='custom_img'>
          <strong>이미지 업로드</strong>
          <div>
            {/* {files &&
              <img src={previewImg} alt='img'/>
            } */}
          </div>
          {/* <div className="preview">
            <img src={files.previewImgUrl} alt="preview-img" />
          </div> */}
        </div>
        

        <form className='upload_input'>  
          <label htmlFor='image'>
            <input type='file' id='image' accept='image/*' onChange={onFileUpload} />
          </label>
          <button onClick={handleClick}>저장하기</button>          
        </form>

        {/* <div className='upload_input'>
          <input type='file' id='image' accept='image/*' onChange={onFileUpload} />
          <button onClick={handleClick}>
            파일 업로드
          </button>
        </div> */}
      </div>
    );



  }

export default FileUpload;