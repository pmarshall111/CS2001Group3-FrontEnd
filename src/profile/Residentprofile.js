import React, {useState} from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./Residentprofile.css";


const Residentprofile = (props) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <main>
            <TitleBar title={"Resident Profile"}>
                <Button variant="primary" onClick={() => setShowForm(true)}>edit</Button>
                <Button variant="primary" onClick={() => setShowForm(true)}>medication</Button>
            </TitleBar>
            <div class="container-fluid">
                <div class="row align-items-start">
                    <div class="col-md-3 .offset-md-2">
                        <img src="https://picsum.photos/200" class="img-thumbnail" alt="..."></img>
                        <h1>John Doe</h1>
                        <h3>D.O.B:23/02/1937</h3>
                        <h3>Alergies:Nut's</h3> 
                        <h3>Guardian: Jane Doe</h3>
                        <h3>Contact Number: 02089991273</h3> 
                        <h3>E-mail:example@hotmail.co.uk</h3>  
                    </div>
                    <div class="col-md-6">
                        <h1>Notes</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
                
                    </div>
                </div>
            </div>
            
        </main>
    );
}

export default Residentprofile;
