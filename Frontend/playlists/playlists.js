async function fetchPlaylists() {
    try {
        const urls = [
          'https://musicworld-fo5v.onrender.com/api/trending',
          'https://musicworld-fo5v.onrender.com/api/liked',
          'https://musicworld-fo5v.onrender.com/api/fun',
          'https://musicworld-fo5v.onrender.com/api/covers',
          'https://musicworld-fo5v.onrender.com/api/throwback'
        ];
    
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
    
        const [data1, data2, data3, data4, data5] = data;
        console.log(data1, data2, data3, data4, data5);
    } catch (err) {
    console.error('Error:', err);
    }
}