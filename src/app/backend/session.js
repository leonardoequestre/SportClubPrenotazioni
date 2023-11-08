const express = require('express');
const app=express();
const bodyParser=require('body-parser');
const mysql=require("mysql");
const cors=require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(express.static('img'));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"prenotazione_campi"
});

app.listen(3100, (error)=>{
    if(error) console.log("Error!!!!" + error);
    else console.log("Started!!! 3100");
});

db.connect((error)=>{
    if(error){
        console.log("errore connessione db "+ error)
    }else{
        console.log("Connesso al db")
    }
});

app.get('/api/persone', (req,res)=>{
    let sql="Select * From persona"
    db.query(sql, (error, result)=>{
        if(error){
            console.log(" errore query "+error)
        }else{
            res.send({status:true, data:result});
        }
    });
});

app.get('/api/prenotazioni.json', (req,res)=>{
    let sql="Select * From prenotazione"
    db.query(sql, (error, result)=>{
        if(error){
            console.log(" errore query "+error)
        }else{
            res.send({status:true, data:result});
        }
    });
});

app.get('/api/deletePrenotazioni/:id', (req,res)=>{
    const {id}=req.params
    let sql=`delete From prenotazione WHERE id_prenotazione='${id}'`
    db.query(sql, (error, result)=>{
        if(error){
            console.log(" errore query "+error)
        }else{
            res.send({status:true, message:"Prenotazione cancellata correttamente",data:result});
        }
    });
});

app.get('/api/getCampi', (req,res)=>{
    let sql="Select * From campo_sportivo "
    db.query(sql, (error, result)=>{
        if(error){
            console.log(" errore query "+error)
        }else{
            res.send({status:true, data:result});
        }
    });
});

app.post('/api/getPrenotazioni',(req,res)=>{
    let id_persona=req.body.id_persona
    let sql=`SELECT * FROM prenotazione,campo_sportivo WHERE prenotazione.campo=campo_sportivo.id AND prenotazione.persona='${id_persona}'`;
    db.query(sql,(err,result)=>{
        if(err)
            console.log("errore query "+err)
        else{
            res.send({status:true, data:result})
        }
    })
});

app.post('/api/deletePrenotazione',(req,res)=>{
    let dati={
        'id_persona':req.body.id_persona,
        'id_campo':req.body.id_campo,
        'data':req.body.data,
        'ora':req.body.ora
    }
    let sql=`DELETE FROM prenotazione WHERE campo= '${dati.id_campo}' AND
        persona='${dati.id_persona}' AND data='${dati.data}' AND orario='${dati.ora}'`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log("errore   "+error)
            res.send({status:false ,message:"Failed Delete"})
        }else{
            res.send({status:true, message:"Prenotazione Cancellata Correttamente"})
        }
    });
});

app.post('/api/checkPrenotazioni',(req,res)=>{
    let dati={
        'id_persona':req.body.id_persona,
        'id_campo':req.body.id_campo,
        'data':req.body.data,
        'ora':req.body.ora
    }
    console.log(dati.ora)
    let ora_mod=`${dati.ora.split(':')[0]}${dati.ora.split(':')[1]}`
    let orario_fine_prenotazione=`${parseInt(dati.ora.split(':')[0])+1}:${(parseInt(dati.ora.split(':')[1])+30)%60}`
    console.log(orario_fine_prenotazione)
    console.log(parseInt(ora_mod))
    let sql_controlla=`Select * from prenotazione where campo='${dati.id_campo}'
                        AND data='${dati.data}' AND orario='${dati.ora}'`;
    db.query(sql_controlla, (error,result)=>{
        if(error){
            console.log(error)
        }else if(result.length==0){
            console.log("posso prenotare")
            res.send({status:true,message:"Posso prenotare"})
        }else{
            console.log("Orario non disponibile")
            res.send({status:false, message:"Orario non disponibile"})
        }
    });
});

app.post('/api/addPrenotazioni',(req,res)=>{
    let dati={
        'id_persona':req.body.id_persona,
        'id_campo':req.body.id_campo,
        'data':req.body.data,
        'ora':req.body.ora
    }
    let sql_inserisci=`INSERT INTO prenotazione (campo, persona, data, orario) VALUES
    ('${dati.id_campo}','${dati.id_persona}','${dati.data}','${dati.ora}')`;
    db.query(sql_inserisci, (error,result)=>{
        if(error){
            console.log("errore   "+error)
            res.send({status:false ,message:"Failed prenotazione"})
        }else{
            res.send({status:true, message:"Prenotazione Effettuata"})
        }
    });
});


app.post('/api/addpersona', (req,res)=>{
    console.log(req.body)
    let dati={
        'nome':req.body.nome,
        'cognome':req.body.cognome,
        'data_nascita':req.body.data_nascita,
        'email':req.body.email,
        'password':req.body.password
    };
    let sql =`INSERT INTO persona (nome, cognome, data_nascita, email, password) VALUES
    ('${dati.nome}','${dati.cognome}','${dati.data_nascita}','${dati.email}','${dati.password}')`;
    console.log(dati);
    db.query(sql, (error,result)=>{
        if(error){
            console.log("errore   "+error)
            res.send({status:false ,message:"Failed Insert persona"})
        }else{
            res.send({status:true, message:"Utente Registrato con successo"})
        }
    });
});


app.post('/api/checkLogin', (req,res)=>{
    let dati={
    'email':req.body.email,
    'password':req.body.password
    };
    let checkloginsql= `SELECT * FROM persona WHERE email='${dati.email}' AND password='${dati.password}'`;
    db.query(checkloginsql, (error,result)=>{
        if(error){
            console.log("errore checklogin "+ error);
            res.send({status:false, message:"Login Errato"})
        }else{
            console.log(result.length)
            if(result.length==0)
                res.send({status:false, message:"Utente non Esistente"})
            else
                res.send({status:true, message:"Login Success",data:result})
        }
    });
});



