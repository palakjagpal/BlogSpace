const formatDate = (date : Date) => {
    return new Date(date).toLocaleDateString();
}

export default formatDate;