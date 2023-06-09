import { Kore } from "../../structs/Kore";
import { Command } from "../../structs/command";
import { CommandInteraction, AnyTextChannelWithoutGroup, Uncached, ApplicationCommandTypes, ApplicationCommandOptionTypes } from "oceanic.js";

import { Kawaii } from "kawaii-api";
import * as dotenv from 'dotenv';
dotenv.config()

export default class BlushCommand extends Command {
    constructor(client: Kore) {
        super(client, {
            name: "blush",
            description: "mention a user to mess with",
            group: "roleplay",
            slash: {
                enabled: true,
                type: ApplicationCommandTypes.CHAT_INPUT,
                options: [
                    {
                        name: "user",
                        description: "user to mention",
                        type: ApplicationCommandOptionTypes.USER
                    }
                ],
            }
        });
    }

    public async interactionRun(interaction: CommandInteraction<AnyTextChannelWithoutGroup | Uncached>): Promise<void> {
        const api = new Kawaii(`${process.env.KAWAIITOKEN}`);
        const user = interaction.data.options.getUser("user");
        const data = await api.get("gif", "blush")
        
        if(user){
            if(interaction.user.mention === user.mention){
                interaction.createMessage({
                    content: `We both know if your choosing yourself you must have no friends`
                });
            } else {
                if(user.mention === this.client.user.mention){
                    interaction.createMessage({
                        content: `Im not your friend.`
                    });
                } else {
                    interaction.createMessage({
                        content: `${interaction.user.mention} has blushed because of ${user.mention}`,
                        embeds: [
                            {
                                author: {
                                    name: user.username,
                                    iconURL: user.avatarURL("jpg")
                                },
        
                                image: {
                                    url: data
                                },
        
                                footer: {
                                    iconURL: this.client.user.avatarURL("jpg"),
                                    text: `Created With Love by MythicXGN`
                                }
                            },
                        ]
                    });
                }
            }
        } else {
            interaction.createMessage({
                content: 'Please provide a user'
            });
        }
    }
}