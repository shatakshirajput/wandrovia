const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        filename : String,
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }
        // set:(v)=>v==="" ? "models\defaultimg.jpg" :v     (to set default image),
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
     geometry: {
    type: {
      type: String,
      enum: ["Point"], 
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
    category: {
        type: String,
        enum: [
          "Trendings",
          "Rooms",
          "Iconic Cities",
          "Mountains",
          "Castles",
          "Amazing Pools",
          "Camping",
          "Farms",
          "Arctic",
        ],
      },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if (listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;