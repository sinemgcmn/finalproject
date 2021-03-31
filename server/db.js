const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petsitting"
);

////////////PART-1//////REG AND LOG//////////////////

module.exports.userInputForRegSit = (
    status,
    address,
    first,
    last,
    email,
    password,
    lat,
    lon,
    rate
) => {
    const q = `
        INSERT INTO familysitters (is_family, s_address, first_name, last_name, email, password_hash, lat, lon, rate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;
    `;
    const params = [
        status,
        address,
        first,
        last,
        email,
        password,
        lat,
        lon,
        rate,
    ];
    return db.query(q, params);
};

module.exports.userInputForRegFam = (
    status,
    first,
    last,
    email,
    password,
    lat,
    lon
) => {
    const q = `
        INSERT INTO familysitters (is_family, first_name, last_name, email, password_hash, lat, lon)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
    `;
    const params = [status, first, last, email, password, lat, lon];
    return db.query(q, params);
};

module.exports.userInputForLog = (email) => {
    const q = `
        SELECT is_family, email, password_hash, id
        FROM familysitters  
        WHERE email = '${email}';
    `;

    const params = email;
    return db.query(q, params);
};

module.exports.selectInfoFromUsers = (email) => {
    const q = `
       SELECT *
       FROM familysitters  
       WHERE email = '${email}';
    `;

    const params = email;
    return db.query(q, params);
};

module.exports.selectAllSitters = () => {
    const q = `
       SELECT *
       FROM familysitters  
       WHERE is_family = 'f';
    `;

    return db.query(q);
};

////////////PART-3//////RESET//////////////////

module.exports.userInputForReset = (email, secretCode) => {
    const q = `
        INSERT INTO reset_codes (email, secret_code)
        VALUES ($1, $2)
        RETURNING id;
    `;
    const params = [email, secretCode];
    return db.query(q, params);
};

module.exports.userCodeForReset = (secretCode) => {
    const q = `
        SELECT secret_code 
        FROM reset_codes  
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
    `;

    const params = secretCode;
    return db.query(q, params);
};

module.exports.updatePassword = (email, password) => {
    const q = `
        UPDATE familysitters
        SET password_hash = $2
        WHERE email = $1;
    `;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.selectFromResetCode = (secretCode) => {
    const q = `
        SELECT email
        FROM reset_codes  
        WHERE secret_code = $1;
    `;

    const params = secretCode;
    return db.query(q, params);
};

////////////PART-4////////PROFILE PIC////////////////

module.exports.selectUserInputForPic = (userId) => {
    const q = `
        SELECT * 
        FROM familysitters
        WHERE id = '${userId}';
    `;

    const params = userId;
    return db.query(q, params);
};

module.exports.updatePic = (userId, url) => {
    const q = `
        UPDATE familysitters
        SET imageurl = $2
        WHERE id = $1
        RETURNING imageurl;
    `;
    const params = [userId, url];
    return db.query(q, params);
};

////////////PART-5////////BIO////////////////
module.exports.updateBioInfo = (userId, bio) => {
    const q = `
        UPDATE familysitters
        SET bio = $2
        WHERE id = $1
        RETURNING bio;
    `;
    const params = [userId, bio];
    return db.query(q, params);
};

module.exports.updateRateInfoWithUser = (userId, rate) => {
    const q = `
        UPDATE familysitters
        SET rate = $2 , counter_rate = counter_rate + 1
        WHERE id = $1
        RETURNING *;
    `;
    const params = [userId, rate];
    return db.query(q, params);
};

module.exports.getRateInfo = (userId) => {
    const q = `
        SELECT rate, counter_rate 
        FROM familysitters  
          WHERE id = $1;
    `;
    const params = [userId];
    return db.query(q, params);
};
module.exports.updateServiceInfo = (userId, service) => {
    const q = `
        UPDATE familysitters
        SET services = $2
        WHERE id = $1
        RETURNING services;
    `;
    const params = [userId, service];
    return db.query(q, params);
};

module.exports.updateHomeInfo = (userId, home) => {
    const q = `
        UPDATE familysitters
        SET home = $2
        WHERE id = $1
        RETURNING home;
    `;
    const params = [userId, home];
    return db.query(q, params);
};

module.exports.updateSkillsInfo = (userId, skills) => {
    const q = `
        UPDATE familysitters
        SET skills = $2
        WHERE id = $1
        RETURNING skills;
    `;
    const params = [userId, skills];
    return db.query(q, params);
};

module.exports.updatePetInfo = (userId, pets) => {
    const q = `
        UPDATE familysitters
        SET pet = $2
        WHERE id = $1
        RETURNING pet;
    `;
    const params = [userId, pets];
    return db.query(q, params);
};

module.exports.selectMessage = (sender) => {
    const q = `
        SELECT familysitters.id, familysitters.imageurl, familysitters.first_name, familysitters.last_name, messages.id AS messages_id, messages.sender_id, messages.recipient_id, messages.info
        FROM messages
        JOIN familysitters
        ON (messages.sender_id= $1 AND messages.sender_id = familysitters.id)
        OR (messages.recipient_id = $1 AND messages.sender_id = familysitters.id) 
        ORDER BY messages.id DESC
        LIMIT 10
    `;

    const params = [sender];
    return db.query(q, params);
};

module.exports.saveMessage = (sender, recipient, info) => {
    const q = `INSERT INTO messages (sender_id, recipient_id, info)
                VALUES($1, $2, $3)
                RETURNING *;`;
    const params = [sender, recipient, info];
    return db.query(q, params);
};

module.exports.getId = (id) => {
    const q = `SELECT *
               FROM users
               WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
};
