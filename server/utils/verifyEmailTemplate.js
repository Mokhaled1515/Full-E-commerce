const verifyEmailTemplate = ({name,url})=>{
    return  `
     <p>Dear ${name}</p>
     <p>Thank you for registering Marmar.</p>
     <a href=${url} style="color: white; background: blue; margin-top: 10px; padding: 4px; border-radius: 2px">
     Verify Email
     </a>    
    `
}

export default verifyEmailTemplate

