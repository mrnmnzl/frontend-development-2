import Handlebars from 'handlebars/runtime';
import $ from 'jquery';
import router from 'page';
import homeTpl from './templates/home.hbs';
import playersTpl from './templates/players.hbs';
import contactTpl from './templates/contact.hbs';
import notFoundTpl from './templates/not-found.hbs';
import playerTpl from './templates/player.hbs';
import { yearsSince } from './helpers';
import { dateFormat } from './helpers';
import playersData from './fixtures/api.json';

Handlebars.registerHelper('dateFormat', dateFormat);
Handlebars.registerHelper('yearsSince', yearsSince);

const $app = $('#app');

function render(template, context = {}) {
    $app.html(template(context));
}

function index() {
    render(homeTpl);
}

function contact() {
    render(contactTpl);
}

function notFound() {
    render(notFoundTpl);
}

function players() { 
    render(playersTpl, {players: playersData});
}

function player(ctx) {
    const {params} = ctx;
    const playerId = params.player;
    const playerData = playersData.find(player => player.id === playerId);
    render(playerTpl, playerData);
}

router('/', index);
router('/contact', contact);
router('/players', players);
router('/players/:player', player);
router('*', notFound);
router();