const express = require('express');
const multer = require('multer');
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up your SQL Server connection configuration
const config = {
    user: 'sa',
    password: 'eman',
    server: 'EMAN-RAFIQUE\\SQLEXPRESS', // Replace with your SQL Server instance name
    database: 'dbMAP',
    options: {
        encrypt: true,
        trustServerCertificate: true, // Use for local development
    }
};

// Endpoint to get employee details (example GET route)
app.get('/API-WebApp_MAP2024/api/Employee/GetEmployee/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const pool = await mssql.connect(config);
        
        // Query to get employee details by ID
        const result = await pool.request()
            .input('id', mssql.Int, id)
            .query('SELECT * FROM Employees WHERE id = @id');
        
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to update employee details
app.put('/API-WebApp_MAP2024/api/Employee/UpdateEmployee/:id', upload.single('profileImage'), async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phoneNo } = req.body;
    const profileImage = req.file ? req.file.buffer : null;

    try {
        const pool = await mssql.connect(config);
        
        // Encrypt password if updated
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds
        }

        // SQL query to update employee details
        const result = await pool.request()
            .input('id', mssql.Int, id)
            .input('name', mssql.NVarChar, name)
            .input('email', mssql.NVarChar, email)
            .input('password', mssql.NVarChar, hashedPassword)
            .input('phoneNumber', mssql.NVarChar, phoneNo)
            .input('profileImage', mssql.VarBinary, profileImage)
            .query(`
                UPDATE Employees
                SET name = @name,
                    email = @email,
                    password = @password,
                    phoneNo = @phoneNumber,
                    imagePath = @profileImage
                WHERE id = @id
            `);

        if (result.rowsAffected > 0) {
            res.status(200).json({ message: 'Employee details updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server on port 3000 (or any port of your choice)
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://192.168.10.8:${port}`);
});
