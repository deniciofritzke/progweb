import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../services/api';
import {InputLabel, Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import SaveIcon from '@material-ui/icons/Save';
import BookRouded from '@material-ui/icons/BookRounded';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://cursos.sesisenai.org.br/">
        Denicio Fritzke - Programação Web - Senai
      </Link>{'  '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const onSubmitLivro = async (e) => {
  e.preventDefault();
  console.log(e.target[0]);
}

export default function CadastrarLivro() {
  const classes = useStyles();
  const [editoras, setEditoras] = useState([]);
  const [edit, setEditora] = useState([]);
  
  const onChangeEditora = (event) => {
    setEditora(event.target.value);
  };

  useEffect(() => {
    api.get('editoras', {}).then(response => {
        setEditoras(response.data);
        });
    }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BookRouded />
        </Avatar>
        <Typography component="h1" variant="h5">
          Livro
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitLivro}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="dlivro"
                name="descricaolivro"
                variant="outlined"
                required
                fullWidth
                id="descricaolivro"
                label="Descrição do livro"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="assuntolivro"
                label="Assunto"
                name="assuntolivro"
                autoComplete="Assunto"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="autorlivro"
                label="Autor"
                id="autorlivro"
                autoComplete="Autor"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="isbnlivro"
                label="ISBN"
                id="isbnlivro"
                autoComplete="ISBN"
                inputProps={{
                  maxLength: 13,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="select-label-editoras">Editora</InputLabel>
              <Select
                  variant="outlined"
                  required
                  fullWidth
                  name="editoralivro"
                  labelId="select-label-editoras"
                  id="editoralivro"
                  autoComplete="Editora"
                  value={edit}
                  onChange={onChangeEditora}
              >
                {editoras.map(editora => (
                  <MenuItem value={editora.edi_codigo}>{editora.edi_nome}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<SaveIcon />}
          >
            Salvar
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}