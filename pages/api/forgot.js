import connectDb from "@/middleware/mongoose";

const   forgot = async (req,res) =>{
    // HERE PASSWORD RESET LINK SENDING LOGIC
    res.status(200).json({success:true})
}

export default connectDb(forgot);