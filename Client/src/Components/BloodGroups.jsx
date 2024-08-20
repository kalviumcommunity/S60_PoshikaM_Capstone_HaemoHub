function BloodGroups({handleBloodGroup}){
    return(
        <div>
            <select 
                name="blood_group" 
                id="blood_group" 
                onChange={handleBloodGroup}
                required
                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
            >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>
        </div>
    )
}

export default BloodGroups