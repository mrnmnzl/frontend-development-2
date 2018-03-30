import Handlebars from 'handlebars';
import $ from 'jquery';
import router from 'page';
import homeTpl from './templates/home.hbs';
import playersTpl from './templates/players.hbs';
import contactTpl from './templates/contact.hbs';
import notFoundTpl from './templates/not-found.hbs';
import playerTpl from './templates/player.hbs';
import { yearsSince } from './helpers';
import { dateFormat } from './helpers';
import carlsen from './fixtures/carlsen.json';
import karjakin from './fixtures/karjakin.json';

Handlebars.registerHelper('df', dateFormat);
Handlebars.registerHelper('yS', yearsSince);

const playersData = new Map();
playersData.set('carlsen', carlsen);
playersData.set('karjakin', karjakin);
const playersDataArray = Array.from(playersData.values());


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

async function players() {
    render(playersTpl, {players: playersDataArray});
}

function player(ctx) {
    const {params} = ctx;
    render(playerTpl, {players: playersData.get(params.player)});
}

router('/', index);
router('/contact', contact);
router('/players', players);
router('/players/:player', player);
router('*', notFound);
router();