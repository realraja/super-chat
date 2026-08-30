

export const tryCatch = (passedFunction) => async(req,res,next) => {
    try {
        await passedFunction(req,res,next);
    } catch (error) {
        console.log(error)
        next(error);
    }
}