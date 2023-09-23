export const IsPasswordValid = (password) => {

    // Minimum eight characters, at least one letter and one number:

    // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    // Minimum eight characters, at least one letter, one number and one special character:

    // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    //const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    /*if (!password) {
        return false
    }
    if (reg.test(password) === false & password != null) {
        return false
    }
    if (reg.test(password) === true & password != null) {
        return true
    }*/

	if(password.trim() == '') {
		return false;
	}

	return true;
}

export const IsEmailValid = (Email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!Email) {
        return false
    }
    if (reg.test(Email) === false & Email != null) {
        return false
    }
    if (reg.test(Email) === true & Email != null) {
        return true
    }
}

export const IsPhoneValid = (phone) => {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phone) {
        return false
    }
    if (reg.test(phone) === false & phone != null) {
        return false
    }
    if (reg.test(phone) === true & phone != null) {
        return true
    }
}

export const IsFullNameValid = (FullName) => {
    if (FullName == '') {
        return false
    }
    if ((FullName) ) {
        return true
    }
}

export const IsSelectValid = (Selected) => {
    if (Selected == "" && Selected == undefined && Selected == null) {
        return false
    }
    else {
        return true
    }
}