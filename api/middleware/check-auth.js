const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
	console.log("from checkAuth");
	console.log(req.headers.authorization,"request from checkAuth")
	try {
		if(req.headers.authorization !== undefined){
			const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token,'secret');
		req.userData = decoded;
		next();
		}else{
			return res.status(401).json({
				messagae: "You are not authorized to do this operation.First login and the do operation."
			});
		}
		
	}catch(error){
		console.log(error)
		return res.status(401).json({
			error: error,
			messagae: "You are not authorized to do this operation.First login and the do operation."
		});
	}
};