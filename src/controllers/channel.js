
const Channel = require("../models/channel");
const moment = require('moment');
const { parseString } = require('xml2js');


async function createNewLive(req, res) {
    const channelObject = req.body;
    delete channelObject._id;
    const post = new Channel(
        channelObject
    )
    post.save()
        .then(() => { res.status(201).json({ message: 'Channel created !' }) })
        .catch(err => { res.status(500).json({ message: 'Error while creating channel ' }) })
}

async function getAllLives(req, res) {
    Channel
        .find()
        .sort({ title: 1 })
        .then((response) => res.status(200).json(response))
        .catch(err => { res.status(500).json({ message: 'Error while fetching posts ' }) })
}


async function getLiveById(req, res) {
    try {
        const channel = await Channel.findOne({ _id: req.params.id });
        if (!channel) {
            return res.status(404).json({ error: 'Live not found' });
        }
        if (channel.epgList) {
            const response = await fetch(channel.epgList);
            const xmlText = await response.text();

            parseString(xmlText, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    return res.status(500).json({ error: 'Error parsing XML' });
                }
                const programs = result.tv.programme;
                const filteredPrograms = programs.filter(program => {
                    const currentDate = new Date();
                    return program.$.channel === channel.channelId && moment(program.$.stop, "YYYYMMDDHHmmss Z").isSameOrAfter(moment(currentDate, "YYYYMMDDHHmmss Z"))
                }).slice(0, 10);

                const responseData = {
                    ...channel._doc,
                    program: filteredPrograms
                };
                res.status(200).json(responseData);
            })
        } else {
            res.status(200).json(channel._doc);
        }

    } catch (error) {
        console.error('Error while fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getLiveById, getAllLives, createNewLive };