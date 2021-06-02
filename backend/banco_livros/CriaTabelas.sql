/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     23/10/2020 21:41:48                          */
/*==============================================================*/

/*
drop domain DM_BAIRRO;

drop domain DM_COMPLEMENTO;

drop domain DM_ENDERECO;

drop domain DM_NOME_PESSOA;

drop domain DM_TELEFONE;
*/

/*==============================================================*/
/* Domain: DM_BAIRRO                                            */
/*==============================================================*/
create domain DM_BAIRRO as VARCHAR(100);

/*==============================================================*/
/* Domain: DM_COMPLEMENTO                                       */
/*==============================================================*/
create domain DM_COMPLEMENTO as VARCHAR(100);

/*==============================================================*/
/* Domain: DM_ENDERECO                                          */
/*==============================================================*/
create domain DM_ENDERECO as VARCHAR(100);

/*==============================================================*/
/* Domain: DM_NOME_PESSOA                                       */
/*==============================================================*/
create domain DM_NOME_PESSOA as VARCHAR(100);

/*==============================================================*/
/* Domain: DM_TELEFONE                                          */
/*==============================================================*/
create domain DM_TELEFONE as VARCHAR(15);

/*==============================================================*/
/* Table: CIDADE                                                */
/*==============================================================*/
create table CIDADE (
   CID_CODIGO           SERIAL               not null,
   UF_CODIGO            INT4                 not null,
   CID_NOME             VARCHAR(200)         null,
   constraint PK_CIDADE primary key (CID_CODIGO)
);

/*==============================================================*/
/* Index: CIDADE_PK                                             */
/*==============================================================*/
create unique index CIDADE_PK on CIDADE (
CID_CODIGO
);

/*==============================================================*/
/* Index: FK_CIDADE_UF_FK                                       */
/*==============================================================*/
create  index FK_CIDADE_UF_FK on CIDADE (
UF_CODIGO
);

/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE (
   CLI_CODIGO           SERIAL               not null,
   CLI_NOME             DM_NOME_PESSOA       null,
   constraint PK_CLIENTE primary key (CLI_CODIGO)
);

/*==============================================================*/
/* Index: CLIENTE_PK                                            */
/*==============================================================*/
create unique index CLIENTE_PK on CLIENTE (
CLI_CODIGO
);

/*==============================================================*/
/* Table: CLIENTE_PF                                            */
/*==============================================================*/
create table CLIENTE_PF (
   CLI_CODIGO           INT4                 not null,
   CLI_NOME             DM_NOME_PESSOA       null,
   CLI_PF_CPF           VARCHAR(14)          null,
   constraint PK_CLIENTE_PF primary key (CLI_CODIGO)
);

/*==============================================================*/
/* Index: CLIENTE_PF_PK                                         */
/*==============================================================*/
create unique index CLIENTE_PF_PK on CLIENTE_PF (
CLI_CODIGO
);

/*==============================================================*/
/* Table: CLIENTE_PJ                                            */
/*==============================================================*/
create table CLIENTE_PJ (
   CLI_CODIGO           INT4                 not null,
   CLI_NOME             DM_NOME_PESSOA       null,
   CLI_PJ_CNPJ          VARCHAR(18)          null,
   constraint PK_CLIENTE_PJ primary key (CLI_CODIGO)
);

/*==============================================================*/
/* Index: CLIENTE_PJ_PK                                         */
/*==============================================================*/
create unique index CLIENTE_PJ_PK on CLIENTE_PJ (
CLI_CODIGO
);

/*==============================================================*/
/* Table: CLIENTE_TELEFONE                                      */
/*==============================================================*/
create table CLIENTE_TELEFONE (
   CLI_CODIGO           INT4                 not null,
   TEL_TIPO_COD         INT4                 not null,
   CLI_TELEFONE_DDD     INT4                 null,
   CLI_TELEFONE_NUMERO  DM_TELEFONE          null,
   constraint PK_CLIENTE_TELEFONE primary key (CLI_CODIGO, TEL_TIPO_COD)
);

/*==============================================================*/
/* Index: CLIENTE_TELEFONE_PK                                   */
/*==============================================================*/
create unique index CLIENTE_TELEFONE_PK on CLIENTE_TELEFONE (
CLI_CODIGO,
TEL_TIPO_COD
);

/*==============================================================*/
/* Index: FK_CLIENTE_TELEFONE_FK                                */
/*==============================================================*/
create  index FK_CLIENTE_TELEFONE_FK on CLIENTE_TELEFONE (
CLI_CODIGO
);

/*==============================================================*/
/* Index: FK_TIPO_TELEFONE_1_FK                                 */
/*==============================================================*/
create  index FK_TIPO_TELEFONE_1_FK on CLIENTE_TELEFONE (
TEL_TIPO_COD
);

/*==============================================================*/
/* Table: EDITORA                                               */
/*==============================================================*/
create table EDITORA (
   EDI_CODIGO           SERIAL               not null,
   EDI_NOME             VARCHAR(200)         null,
   EDI_NOME_GERENTE     DM_NOME_PESSOA       null,
   constraint PK_EDITORA primary key (EDI_CODIGO)
);

/*==============================================================*/
/* Index: EDITORA_PK                                            */
/*==============================================================*/
create unique index EDITORA_PK on EDITORA (
EDI_CODIGO
);

/*==============================================================*/
/* Table: EDITORA_TELEFONE                                      */
/*==============================================================*/
create table EDITORA_TELEFONE (
   EDI_CODIGO           INT4                 not null,
   TEL_TIPO_COD         INT4                 not null,
   EDI_TELEFONE_DDD     INT4                 null,
   EDI_TELEFONE_NUMERO  DM_TELEFONE          null,
   constraint PK_EDITORA_TELEFONE primary key (EDI_CODIGO, TEL_TIPO_COD)
);

/*==============================================================*/
/* Index: EDITORA_TELEFONE_PK                                   */
/*==============================================================*/
create unique index EDITORA_TELEFONE_PK on EDITORA_TELEFONE (
EDI_CODIGO,
TEL_TIPO_COD
);

/*==============================================================*/
/* Index: FK_EDITORA_TELEFONE_FK                                */
/*==============================================================*/
create  index FK_EDITORA_TELEFONE_FK on EDITORA_TELEFONE (
EDI_CODIGO
);

/*==============================================================*/
/* Index: FK_TIPO_TELEFONE_2_FK                                 */
/*==============================================================*/
create  index FK_TIPO_TELEFONE_2_FK on EDITORA_TELEFONE (
TEL_TIPO_COD
);

/*==============================================================*/
/* Table: ENDERECO                                              */
/*==============================================================*/
create table ENDERECO (
   END_CODIGO           SERIAL               not null,
   CID_CODIGO           INT4                 not null,
   END_CEP              INT4                 not null,
   END_LOGRADOURO       VARCHAR(30)          null,
   END_ENDERECO         DM_ENDERECO          null,
   END_BAIRRO           DM_BAIRRO            null,
   constraint PK_ENDERECO primary key (END_CODIGO)
);

/*==============================================================*/
/* Index: ENDERECO_PK                                           */
/*==============================================================*/
create unique index ENDERECO_PK on ENDERECO (
END_CODIGO
);

/*==============================================================*/
/* Index: FK_ENDERECO_CIDADE_FK                                 */
/*==============================================================*/
create  index FK_ENDERECO_CIDADE_FK on ENDERECO (
CID_CODIGO
);

/*==============================================================*/
/* Table: ENDERECO_CLIENTE                                      */
/*==============================================================*/
create table ENDERECO_CLIENTE (
   CLI_CODIGO           INT4                 not null,
   END_CODIGO           INT4                 not null,
   END_TIPO_COD         INT4                 not null,
   CLI_ENDERECO_NUMERO  VARCHAR(10)          null,
   CLI_ENDERECO_COMPLEMENTO DM_COMPLEMENTO       null,
   constraint PK_ENDERECO_CLIENTE primary key (CLI_CODIGO, END_CODIGO, END_TIPO_COD)
);

/*==============================================================*/
/* Index: ENDERECO_CLIENTE_PK                                   */
/*==============================================================*/
create unique index ENDERECO_CLIENTE_PK on ENDERECO_CLIENTE (
CLI_CODIGO,
END_CODIGO,
END_TIPO_COD
);

/*==============================================================*/
/* Index: FK_CLIENTE_ENDERECO_1_FK                              */
/*==============================================================*/
create  index FK_CLIENTE_ENDERECO_1_FK on ENDERECO_CLIENTE (
CLI_CODIGO
);

/*==============================================================*/
/* Index: FK_CLIENTE_ENDERECO_2_FK                              */
/*==============================================================*/
create  index FK_CLIENTE_ENDERECO_2_FK on ENDERECO_CLIENTE (
END_CODIGO
);

/*==============================================================*/
/* Index: FK_TIPO_ENDERECO_1_FK                                 */
/*==============================================================*/
create  index FK_TIPO_ENDERECO_1_FK on ENDERECO_CLIENTE (
END_TIPO_COD
);

/*==============================================================*/
/* Table: ENDERECO_EDITORA                                      */
/*==============================================================*/
create table ENDERECO_EDITORA (
   END_CODIGO           INT4                 not null,
   EDI_CODIGO           INT4                 not null,
   END_TIPO_COD         INT4                 not null,
   EDI_ENDERECO_NUMERO  INT4                 null,
   EDI_ENDERECO_COMPLEMENTO VARCHAR(200)         null,
   constraint PK_ENDERECO_EDITORA primary key (END_CODIGO, EDI_CODIGO, END_TIPO_COD)
);

/*==============================================================*/
/* Index: ENDERECO_EDITORA_PK                                   */
/*==============================================================*/
create unique index ENDERECO_EDITORA_PK on ENDERECO_EDITORA (
END_CODIGO,
EDI_CODIGO,
END_TIPO_COD
);

/*==============================================================*/
/* Index: FK_EDITORA_ENDERECO_2_FK                              */
/*==============================================================*/
create  index FK_EDITORA_ENDERECO_2_FK on ENDERECO_EDITORA (
END_CODIGO
);

/*==============================================================*/
/* Index: FK_EDITORA_ENDERECO_1_FK                              */
/*==============================================================*/
create  index FK_EDITORA_ENDERECO_1_FK on ENDERECO_EDITORA (
EDI_CODIGO
);

/*==============================================================*/
/* Index: FK_TIPO_ENDERECO_2_FK                                 */
/*==============================================================*/
create  index FK_TIPO_ENDERECO_2_FK on ENDERECO_EDITORA (
END_TIPO_COD
);

/*==============================================================*/
/* Table: ESTOQUE                                               */
/*==============================================================*/
create table ESTOQUE (
   LIV_CODIGO           INT4                 not null,
   EST_QUANTIDADE       INT4                 null,
   EST_VALOR_UNITARIO   NUMERIC(18,2)        null,
   constraint PK_ESTOQUE primary key (LIV_CODIGO)
);

/*==============================================================*/
/* Index: ESTOQUE_PK                                            */
/*==============================================================*/
create unique index ESTOQUE_PK on ESTOQUE (
LIV_CODIGO
);

/*==============================================================*/
/* Table: LIVRO                                                 */
/*==============================================================*/
create table LIVRO (
   LIV_CODIGO           SERIAL               not null,
   EDI_CODIGO           INT4                 not null,
   LIV_DESCRICAO        VARCHAR(200)         null,
   LIV_ASSUNTO          VARCHAR(200)         null,
   LIV_AUTOR            DM_NOME_PESSOA       null,
   LIV_ISBN             VARCHAR(50)          null,
   constraint PK_LIVRO primary key (LIV_CODIGO)
);

/*==============================================================*/
/* Index: LIVRO_PK                                              */
/*==============================================================*/
create unique index LIVRO_PK on LIVRO (
LIV_CODIGO
);

/*==============================================================*/
/* Index: FK_LIVRO_EDITORA_FK                                   */
/*==============================================================*/
create  index FK_LIVRO_EDITORA_FK on LIVRO (
EDI_CODIGO
);

/*==============================================================*/
/* Table: TIPO_ENDERECO                                         */
/*==============================================================*/
create table TIPO_ENDERECO (
   END_TIPO_COD         SERIAL               not null,
   END_TIPO_DESCRICAO   VARCHAR(50)          null,
   constraint PK_TIPO_ENDERECO primary key (END_TIPO_COD)
);

/*==============================================================*/
/* Index: TIPO_ENDERECO_PK                                      */
/*==============================================================*/
create unique index TIPO_ENDERECO_PK on TIPO_ENDERECO (
END_TIPO_COD
);

/*==============================================================*/
/* Table: TIPO_TELEFONE                                         */
/*==============================================================*/
create table TIPO_TELEFONE (
   TEL_TIPO_COD         SERIAL               not null,
   TEL_TIPO_DESCRICAO   VARCHAR(50)          null,
   constraint PK_TIPO_TELEFONE primary key (TEL_TIPO_COD)
);

/*==============================================================*/
/* Index: TIPO_TELEFONE_PK                                      */
/*==============================================================*/
create unique index TIPO_TELEFONE_PK on TIPO_TELEFONE (
TEL_TIPO_COD
);

/*==============================================================*/
/* Table: UF                                                    */
/*==============================================================*/
create table UF (
   UF_CODIGO            SERIAL               not null,
   UF_NOME              VARCHAR(200)         null,
   UF_SIGLA             VARCHAR(2)           null,
   constraint PK_UF primary key (UF_CODIGO)
);

/*==============================================================*/
/* Index: UF_PK                                                 */
/*==============================================================*/
create unique index UF_PK on UF (
UF_CODIGO
);

/*==============================================================*/
/* Table: VENDA                                                 */
/*==============================================================*/
create table VENDA (
   VEN_CODIGO           SERIAL               not null,
   CLI_CODIGO           INT4                 not null,
   VEN_DATA             DATE                 null,
   constraint PK_VENDA primary key (VEN_CODIGO)
);

/*==============================================================*/
/* Index: VENDA_PK                                              */
/*==============================================================*/
create unique index VENDA_PK on VENDA (
VEN_CODIGO
);

/*==============================================================*/
/* Index: FK_CLIENTE_VENDA_FK                                   */
/*==============================================================*/
create  index FK_CLIENTE_VENDA_FK on VENDA (
CLI_CODIGO
);

/*==============================================================*/
/* Table: VENDA_ITEM                                            */
/*==============================================================*/
create table VENDA_ITEM (
   VEN_CODIGO           INT4                 not null,
   VEN_ITEM_CODIGO      SERIAL               not null,
   LIV_CODIGO           INT4                 not null,
   VEN_ITEM_VALOR_UNITARIO NUMERIC(18,2)        null,
   VEN_ITEM_QUANTIDADE  INT4                 null,
   VEN_ITEM_VALOR_LINHA NUMERIC(18,2)        null,
   constraint PK_VENDA_ITEM primary key (VEN_CODIGO, VEN_ITEM_CODIGO)
);

/*==============================================================*/
/* Index: VENDA_ITEM_PK                                         */
/*==============================================================*/
create unique index VENDA_ITEM_PK on VENDA_ITEM (
VEN_CODIGO,
VEN_ITEM_CODIGO
);

/*==============================================================*/
/* Index: FK_VENDA_ITEM_FK                                      */
/*==============================================================*/
create  index FK_VENDA_ITEM_FK on VENDA_ITEM (
VEN_CODIGO
);

/*==============================================================*/
/* Index: FK_LIVRO_VENDA_ITEM_FK                                */
/*==============================================================*/
create  index FK_LIVRO_VENDA_ITEM_FK on VENDA_ITEM (
LIV_CODIGO
);

alter table CIDADE
   add constraint FK_CIDADE_FK_CIDADE_UF foreign key (UF_CODIGO)
      references UF (UF_CODIGO)
      on delete restrict on update restrict;

alter table CLIENTE_PF
   add constraint FK_CLIENTE__HER_CLIEN_CLIENTE foreign key (CLI_CODIGO)
      references CLIENTE (CLI_CODIGO)
      on delete cascade on update restrict;

alter table CLIENTE_PJ
   add constraint FK_CLIENTE__HER_CLIEN_CLIENTE foreign key (CLI_CODIGO)
      references CLIENTE (CLI_CODIGO)
      on delete cascade on update restrict;

alter table CLIENTE_TELEFONE
   add constraint FK_CLIENTE__FK_CLIENT_CLIENTE foreign key (CLI_CODIGO)
      references CLIENTE (CLI_CODIGO)
      on delete cascade on update restrict;

alter table CLIENTE_TELEFONE
   add constraint FK_CLIENTE__FK_TIPO_T_TIPO_TEL foreign key (TEL_TIPO_COD)
      references TIPO_TELEFONE (TEL_TIPO_COD)
      on delete restrict on update restrict;

alter table EDITORA_TELEFONE
   add constraint FK_EDITORA__FK_EDITOR_EDITORA foreign key (EDI_CODIGO)
      references EDITORA (EDI_CODIGO)
      on delete cascade on update restrict;

alter table EDITORA_TELEFONE
   add constraint FK_EDITORA__FK_TIPO_T_TIPO_TEL foreign key (TEL_TIPO_COD)
      references TIPO_TELEFONE (TEL_TIPO_COD)
      on delete restrict on update restrict;

alter table ENDERECO
   add constraint FK_ENDERECO_FK_ENDERE_CIDADE foreign key (CID_CODIGO)
      references CIDADE (CID_CODIGO)
      on delete restrict on update restrict;

alter table ENDERECO_CLIENTE
   add constraint FK_ENDERECO_FK_CLIENT_CLIENTE foreign key (CLI_CODIGO)
      references CLIENTE (CLI_CODIGO)
      on delete cascade on update restrict;

alter table ENDERECO_CLIENTE
   add constraint FK_ENDERECO_FK_CLIENT_ENDERECO foreign key (END_CODIGO)
      references ENDERECO (END_CODIGO)
      on delete cascade on update restrict;

alter table ENDERECO_CLIENTE
   add constraint FK_ENDERECO_FK_TIPO_E_TIPO_END foreign key (END_TIPO_COD)
      references TIPO_ENDERECO (END_TIPO_COD)
      on delete restrict on update restrict;

alter table ENDERECO_EDITORA
   add constraint FK_ENDERECO_FK_EDITOR_EDITORA foreign key (EDI_CODIGO)
      references EDITORA (EDI_CODIGO)
      on delete cascade on update restrict;

alter table ENDERECO_EDITORA
   add constraint FK_ENDERECO_FK_EDITOR_ENDERECO foreign key (END_CODIGO)
      references ENDERECO (END_CODIGO)
      on delete restrict on update restrict;

alter table ENDERECO_EDITORA
   add constraint FK_ENDERECO_FK_TIPO_E_TIPO_END foreign key (END_TIPO_COD)
      references TIPO_ENDERECO (END_TIPO_COD)
      on delete restrict on update restrict;

alter table ESTOQUE
   add constraint FK_ESTOQUE_FK_LIVRO__LIVRO foreign key (LIV_CODIGO)
      references LIVRO (LIV_CODIGO)
      on delete restrict on update restrict;

alter table LIVRO
   add constraint FK_LIVRO_FK_LIVRO__EDITORA foreign key (EDI_CODIGO)
      references EDITORA (EDI_CODIGO)
      on delete restrict on update restrict;

alter table VENDA
   add constraint FK_VENDA_FK_CLIENT_CLIENTE foreign key (CLI_CODIGO)
      references CLIENTE (CLI_CODIGO)
      on delete restrict on update restrict;

alter table VENDA_ITEM
   add constraint FK_VENDA_IT_FK_LIVRO__LIVRO foreign key (LIV_CODIGO)
      references LIVRO (LIV_CODIGO)
      on delete cascade on update restrict;

alter table VENDA_ITEM
   add constraint FK_VENDA_IT_FK_VENDA__VENDA foreign key (VEN_CODIGO)
      references VENDA (VEN_CODIGO)
      on delete cascade on update restrict;

