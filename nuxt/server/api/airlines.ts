export default defineEventHandler((event) => {
    const airlines = {
        airlines: [
            {
                id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
                name: 'SkyControl Airlines',
                country: 'US',
                destinations: ['US', 'CA', 'MX', 'PA'],
                imageURL:
                'https://img.freepik.com/vector-gratis/avion-trayectoria-vuelo-circular_78370-4778.jpg',
                aircrafts: ['N737AG', 'N738AG', 'N739AG'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
                name: 'Global Wings',
                country: 'GB',
                destinations: ['GB', 'FR', 'DE', 'ES', 'IT'],
                imageURL:
                'https://img.freepik.com/vector-gratis/avion-trayectoria-vuelo-circular_78370-4778.jpg',
                aircrafts: ['G123GB', 'G456GB', 'G789GB'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
                name: 'AeroNova',
                country: 'CA',
                destinations: ['CA', 'US'],
                imageURL:
                'https://img.freepik.com/vector-gratis/avion-trayectoria-vuelo-circular_78370-4778.jpg',
                aircrafts: ['A123CA', 'A456CA', 'A789CA'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'cccccccc-cccc-4ccc-9ccc-cccccccccccc',
                name: 'AeroCanada',
                country: 'CA',
                destinations: ['CA', 'US', 'CO', 'AR'],
                imageURL:
                'https://img.freepik.com/vector-gratis/avion-trayectoria-vuelo-circular_78370-4778.jpg',
                aircrafts: ['C123CA', 'C456CA', 'C789CA'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'cccccccc-cccc-4ccc-0ccc-cccccccccccc',
                name: 'Americana Airlines',
                country: 'US',
                destinations: ['US', 'CU', 'DO'],
                imageURL:
                'https://img.freepik.com/vector-gratis/avion-trayectoria-vuelo-circular_78370-4778.jpg',
                aircrafts: ['A123US', 'A456US', 'A789US'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ]
    };

    return airlines;
});
