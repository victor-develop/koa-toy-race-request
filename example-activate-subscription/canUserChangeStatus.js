const canUserChangeStatus = (from_status, to_status) => {
    if (from_status === 'active' && to_status === 'active') {
        return false;
    }
    return true;
};

module.exports = canUserChangeStatus

