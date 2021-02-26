<template>
	<div class="window white">
        <fieldset>
            <legend>Bug bounty</legend>
            <div>
                <span class='title'>
                    <span class='first-letter'>S</span>cope:
                </span>
                <div class='description'>
                    Issues which can lead to substantial loss of money, critical bugs like a broken live-ness condition or irreversible loss of funds.
                </div>
            </div>
            <div>
                <span class='title'>
                    <span class='first-letter'>D</span>isclosure policy:
                </span>
                <div class='description'>
                    <ul>
                        <li>Let us know as soon as possible upon discovery of a potential security issue.</li>
                        <li>Provide us a reasonable amount of time to resolve the issue before any disclosure to the public or a third-party.</li>
                    </ul>
                </div>
            </div>
            <div>
                <span class='title'>
                    <span class='first-letter'>E</span>xclusions:
                </span>
                <div class='description'>
                    <ul>
                        <li>Already known vulnerabilities.</li>
                        <li>Vulnerabilities in front-end code not leading to smart contract vulnerabilities.</li>
                    </ul>
                </div>
            </div>
            <div>
                <span class='title'>
                    <span class='first-letter'>E</span>ligibility:
                </span>
                <div class='description'>
                   <li>  You must be the first reporter of the vulnerability </li>
                
                    <li> You must be able to verify a signature from same address </li>
                
                    <li> Provide enough information about the vulnerability </li>
                </div>
            </div>
            <div>
                <span class='title'>
                    <span class='first-letter'>B</span>ounty payout:
                </span>
                <div class='description'>
                    <div>
                        <span class='low'>Low:</span> $2,500 USD
                    </div>
                    <div>
                        <span class='medium'>Medium:</span> $5,000 USD
                    </div>
                    <div>
                        <span class='high'>High:</span> $10,000 USD
                    </div>
                    <div>
                        <span class='veryhigh'>Very high:</span> $50,000 USD
                    </div>
                </div>
            </div>
            <div>
                <span class='title'>
                    <span class='first-letter'>C</span>ontact:
                </span>
                <div class='description'>
                    security@curve.fi
                </div>
            </div>
        </fieldset>
        
    </div>
</template>

<style scoped>
    fieldset legend {
        text-align: center;
    }
    fieldset > div {
        margin-top: 1em;
    }
    .title {
        font-weight: bolder;
    }
    .first-letter {
        color: yellow;
    }
    .description {
        padding: 0.3em;
        margin-top: 0.3em;
    }
    .description li {
        margin-top: 0.3em;
    }
    .low {
        color: grey;
    }
    .medium {
        color: green;
    }
    .high {
        color: purple;
    }
    .veryhigh {
        color: darkred;
    }
</style>
