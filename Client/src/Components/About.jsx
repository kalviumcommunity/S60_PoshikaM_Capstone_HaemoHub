import Footer from "./Footer";
import Navbar from "./Navbar";

function About(){

    return(
        <div>
            <div className="mb-20">
                <Navbar/>
            </div>
            <div>
                <h1 className="text-4xl font-bold">About HaemoHub</h1>
                <p className="mt-6 font-bold">Welcome to HaemoHub, where technology meets altruism to save lives and build a community of hope. Our platform is a beacon of light for those in need of blood transfusions. The go-to platform for finding blood donations nearby and saving lives in your community. Powered by technology and fueled by compassion, HaemoHub simplifies the process of locating blood donors and nearby blood banks, ensuring timely access to life-saving resources..</p>
            </div>


            <div className="mt-20 flex place-content-center gap-x-40">
                <div>
                    <img src="../src/assets/OurMission.png" alt="Our Mission" />
                </div>
                <div className="pl-20">
                    <p className="w-96 font-semibold text-lg"> At HaemoHub, our mission is to harness the power of technology to make blood donation accessible and efficient, ultimately saving lives in the process. We are dedicated to connecting donors with recipients in need, prioritizing speed and convenience without compromising on the quality of care. We believe in the power of collective action and the profound impact it can have on healthcare outcomes.</p>
                </div>
            </div>


            <div className="mt-20 flex place-content-center gap-x-40">
                <div className="pr-20 ">
                    <p className="w-96 font-semibold text-lg">HaemoHub is at the forefront of life-saving initiatives, streamlining the process of finding blood donations in your area. By providing real-time access to nearby blood banks and donors, we ensure that patients receive the critical care they need when they need it most.</p>
                </div>
                <div>
                    <img className="h-64 w-94 " src="../src/assets/LifeSavingImpact.png" alt="Lifesaving Impact" />
                </div>
            </div>


            <div className="mt-20 flex place-content-center gap-x-40">
                <div>
                    <img className="h-64 w-94 " src="../src/assets/CommunityEmpowerment.jpg" alt="Community Empowerment" />
                </div>
                <div className=" pl-20">
                    <p className="w-96 font-semibold text-lg">Beyond saving lives, HaemoHub empowers communities to come together and make a difference. Through our platform, individuals can contribute to the well-being of others, fostering a culture of empathy, support, and altruism. Whether you are in need of blood or looking to donate, HaemoHub is here to support you every step of the way.</p>
                </div>
            </div>


            <div className="mt-20 flex place-content-center gap-x-40">
                <div className="w-96 font-semibold text-lg">
                    <p>HaemoHub offers a user-friendly search experience, designed to connect blood donors and recipients seamlessly:</p>
                        <p><b>Search Nearby: </b>Use our search feature to locate blood banks and donors in your area. With just a few clicks, you can find the resources you need to save lives.</p>
                        <p><b>Real-time Availability: </b>Access real-time information about blood availability and donor locations, ensuring timely access to life-saving resources.</p>
                </div>
                <div>
                    <img src="../src/assets/OurApproach.jpeg" alt="Our Approach" />
                </div>
            </div>


            <div className="mt-20 place-content-center gap-x-20">            
                <div>
                    <h1 className="text-4xl">Join the Movement</h1>
                </div>
                <div>
                    <p className="mt-6 font-semibold text-lg">HaemoHub invites you to join our community of life-savers and make a difference today. Together, we can ensure that no one faces a shortage of blood when they need it most.</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Thank you for choosing HaemoHub. Lets save lives, one search at a time.</p>
                </div>
            </div>
            <div className="mt-20">
                <Footer/>
            </div>
        </div>
    )
}

export default About;