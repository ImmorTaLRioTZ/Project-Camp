import { APIResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new APIResponse(200, {message: "Success"}));
})

export { healthCheck };


// const healthCheck = (req, res) => {
//     try {
//         res.status(200).json(new APIResponse(
//             200, {message: "success"}
//         ));
//     }
//     catch(error) {

//     }
// };