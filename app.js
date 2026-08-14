function getAppMessage() {
    return 'Fraz Jenkins Node Application';
}

if (require.main === module) {
    console.log(getAppMessage());
}

module.exports = getAppMessage;
