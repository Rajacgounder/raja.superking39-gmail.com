import React, { Component } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import firebaseApp from "../../config/fbConfig";

const ExamplePDFViewer = () => {
    return (
        <PDFViewer
            document={{
                url: 'https://firebasestorage.googleapis.com/v0/b/final-2a0a0.appspot.com/o/images%2FReqView-Example_Software_Requirements_Specification_SRS_Document.pdf?alt=media&token=ee348272-e99b-4f3f-b64b-f603a8519f33',
            }}
        />
    )

}
export default ExamplePDFViewer;
// class DisplayFile extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             files: []
//         };

//         this.getFile("files");
//     }

//     getFile() {
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
//                 state.files = res.items;
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
//                             console.log.error("File not found", error)
//                         });
//                 });
//             })
//             .catch(function (error) {
//                 // Uh-oh, an error occurred!
//             });
//     }

//     render() {
//         let numbersOfFilesInFolder = this.state.files.length;

//         let FilesInFolder = this.state.files.map(file => {
//             return (
//                 <>

//                 </>
//             );
//         });

//         return (
//             <>
//                 <br />
//                 {numbersOfFilesInFolder}
//                 {FilesInFolder}
//             </>
//         );
//     }
// }

// export default DisplayFile;