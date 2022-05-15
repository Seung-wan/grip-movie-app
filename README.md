## 영화 검색 및 즐겨찾기 React 앱

### [배포한 페이지](https://grip-movie-app.vercel.app/)

## 개발 환경
### React 18 + TypeScript + Recoil

### axios : Promise 기반의 HTTP 통신 라이브러리
### store : localStorage를 직렬화, 역직렬화 없이 간편하게 사용 할 수 있게 해준다.

## 폴더 구조
📦src  
 ┣ 📂assets  
 ┣ 📂components  
 ┣ 📂hooks  
 ┣ 📂routes  
 ┃ ┣ 📂Movie  
 ┃ ┃ ┣ 📂Favorites  
 ┃ ┃ ┃ ┣ 📜favorites.module.scss  
 ┃ ┃ ┃ ┗ 📜index.tsx  
 ┃ ┃ ┣ 📂_common  
 ┃ ┃ ┃ ┣ 📜Footer.tsx    
 ┃ ┃ ┃ ┣ 📜Header.tsx  
 ┃ ┃ ┃ ┣ 📜footer.module.scss   
 ┃ ┃ ┃ ┗ 📜header.module.scss  
 ┃ ┃ ┣ 📂recoil  
 ┃ ┃ ┃ ┗ 📜movie.ts    
 ┃ ┃ ┣ 📜Item.tsx   
 ┃ ┃ ┣ 📜MovieList.tsx   
 ┃ ┃ ┣ 📜SelectModal.tsx   
 ┃ ┃ ┣ 📜Spinner.tsx   
 ┃ ┃ ┣ 📜index.tsx   
 ┃ ┃ ┣ 📜item.module.scss   
 ┃ ┃ ┣ 📜movie.module.scss   
 ┃ ┃ ┣ 📜movieList.module.scss   
 ┃ ┃ ┗ 📜selectModal.module.scss   
 ┃ ┣ 📜index.tsx   
 ┃ ┗ 📜routes.module.scss    
 ┣ 📂services   
 ┃ ┗ 📜movie.ts   
 ┣ 📂styles   
 ┣ 📂types    
 ┃ ┗ 📜movie.d.ts   
 ┣ 📂utils         
 ┃ ┗ 📜axios.ts        
 ┣ 📜index.tsx        
 ┣ 📜logo.svg       
 ┣ 📜react-app-env.d.ts      
 ┣ 📜reportWebVitals.ts             
 ┗ 📜setupTests.ts
 



## 기능
- 영화 검색
- 즐겨찾기 등록


![movie_low_gif](https://user-images.githubusercontent.com/51105841/168458771-0142b606-5dc4-4c1d-a7eb-7a56f5e59453.gif)

