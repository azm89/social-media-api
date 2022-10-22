const formatDateTime = timestamp => {
    const date = new Date( timestamp );
    return date.toLocaleDateString( 'en-us', { year: 'numeric', month: 'short', day: 'numeric' } ) + ' at ' + date.toLocaleTimeString( 'en-us', { hour: 'numeric', minute: 'numeric' } );
}

module.exports = formatDateTime;