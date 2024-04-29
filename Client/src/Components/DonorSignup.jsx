import States from "./States";

function DonorSignup(){
    return(
        <div>
            <h1>Donor Signup</h1>
            <input type="text" placeholder="Enter Name"/><br />
            <input type="text" placeholder="Enter your email address"/><br />
            <input type="text" placeholder="Enter your Phone Number"/><br />
            <input type="text" placeholder="Enter Password"/><br />
            <input type="text" placeholder="Confirm Password"/><br />
            <input type="text" placeholder="Gender"/><br />
            <input type="text" placeholder="Age" /><br />
            <textarea type="text" placeholder="Address" cols="30" rows="10"></textarea>
            <States/>
        </div>
    )
}

export default DonorSignup;