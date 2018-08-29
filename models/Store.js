const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a store name!"
    },
    slug: String,

    description: {
        type: String,
        trim: true
    },
    tags: [String],

    created: {
        type: Date,
        default: Date.now
    },

    location: {
        type: {
            type: String,
            default: "Poin"
        },
        coordinates: [
            {
                type: Number,
                required: "You must supply coordinates!"
            }
        ],
        address: {
            type: String,
            required: "You must supply an address!"
        }
    },
    photo: String
});

storeSchema.pre("save", async function(next) {
    if (!this.isModified("name")) {
        next(); //skip it
        return; // stop this function from runnig
    }
    this.slug = slug(this.name);
    // find other stores that hava a slug of dogu-1, dogu-2, dogu-3

    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx }); // this.constructor for reach out the this model --> Store
    if (storesWithSlug.length) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
    //TODO: make more resiliant so slugs are unique
});

storeSchema.statics.getTagsList = function() {
    return this.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
};

module.exports = mongoose.model("Store", storeSchema);
