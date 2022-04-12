/**
 * B. NodeJS + MySQL assignment
 * Table "company" has the following columns: companyId, companyName
 * Table "user" has the following columns: userId, userName, email, mobile, password, companyId
 * companyId is a foreign key to "company" table
 * Write a function in NodeJS that has "companyId" as a parameter. This function should return a list of users that belong to this companyId. 
 */

module.exports.getUsersByCompany = (companyId) => {
    
    try{
        const query = "SELECT * FROM `users` WHERE companyId=" + companyId + " ORDER BY userId ASC";       
        db.query(query, (err, result) => {
            if (err) {
                throw new Error("Error fetching data.")
            }
            return result;
        });
    }
    catch(err){
        console.log(err)
    }
}