// const apiUrl = 'http://95.110.132.24:8056';
// let DataIeristring = [];
// let languagesAPI =[];

// // Intenta cargar desde la caché
// const cachedData = localStorage.getItem('DataIeristring');
// const cachedData2 = localStorage.getItem('languagesAPI');


//     fetchData();


// async function fetchData() {
//     try {
//         const response = await fetch(`${apiUrl}/items/ris_ieri/?limit=-1`);
//         const response2 = await fetch(`${apiUrl}/items/lingue/?limit=-1`);

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         if (!response2.ok) {
//             throw new Error(`Error: ${response2.statusText}`);
//         }
//         const data = await response.json();
//         console.log(data)
//         DataIeristring = data.data;

//         localStorage.setItem('DataIeristring', JSON.stringify(DataIeristring));



//         const data2 = await response2.json();
//         console.log(data2)
//         languagesAPI = data2.data;

//         localStorage.setItem('languagesAPI', JSON.stringify(languagesAPI));

//         processRisonanzeIeriData();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// function processRisonanzeIeriData() {
// }
