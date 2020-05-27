import React, { Component } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import firebaseApp from "../../config/fbConfig";

const ExamplePDFViewer = () => {
    return (
        <PDFViewer
            document={{
                url: 'https://firebasestorage.googleapis.com/v0/b/duration-6dcea.appspot.com/o/images%2Ffinal_copy.pdf?alt=media&token=40c215be-27a1-48d4-b283-d741d6bee60c',
            }}
        />
    )

}

export default ExamplePDFViewer;
// class DisplayFile extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             images: []
//         };

//         this.getImage("images");
//     }

//     getImage() {
//         let { state } = this;

//         // Create a reference under which you want to list
//         var listRef = firebaseApp
//             .storage()
//             .ref()
//             .child("/document");

//         // Find all the prefixes and items.
//         listRef
//             .listAll()
//             .then(function (res) {
//                 // Store the list in the state, just in case we need it somewhere
//                 state.images = res.items;
//                 state.downloadURLs = {}; // in here we'll store the download URL for each image by its name
//                 this.setState(state);

//                 res.items.forEach(function (itemRef) {
//                     itemRef
//                         .getDownloadURL()
//                         .then(url => {
//                             state.downloadURLs[itemRef.name] = url;
//                             this.setState(state);
//                         })
//                         .catch(error => {
//                             // Handle any errors
//                         });
//                 });
//             })
//             .catch(function (error) {
//                 // Uh-oh, an error occurred!
//             });
//     }

//     render() {
//         let numbersOfImagesInFolder = this.state.images.length;

//         let imagesInFolder = this.state.images.map(image => {
//             return (
//                 <>
//                     <img
//                         key={image}
//                         src={require(`${image}.jpg`)}
//                         alt=""
//                         className="img-responsive"
//                     />
//                 </>
//             );
//         });

//         return (
//             <>
//                 <br />
//                 {numbersOfImagesInFolder}
//                 {imagesInFolder}
//             </>
//         );
//     }
// }

//export default DisplayFile;