/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const {
  RichResponse,
  PLATFORMS,
  SUPPORTED_RICH_MESSAGE_PLATFORMS,
  V2_TO_V1_PLATFORM_NAME,
} = require('./rich-response');

/**
 * Enum for Dialogflow v1 text message object https://dialogflow.com/docs/reference/agent/message-objects
 */
const v1MessageObjectCard = 1;

/**
 * Class representing a card response
 * @extends RichResponse
 */
class Card extends RichResponse {
  /**
   * Constructor for Card object.
   *
   * @example
   * let card = new Card('card title');
   * card.setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png');
   * card.setText('This is the body text of a card.  You can even use line\nbreaks and emoji! 💁');
   * card.setButton1({text: 'This is a button', url: 'https://assistant.google.com/'});
   * card.setButton2({text: 'This is a button', url: 'https://assistant.google.com/'});
   * card.setButton3({text: 'This is a button', url: 'https://assistant.google.com/'});
   *
   * const anotherCard = new Card({
   *     title: 'card title',
   *     text: 'card text',
   *     imageUrl: https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png,
   *     
   *     platform: 'ACTIONS_ON_GOOGLE',
   *     
   *     buttonText1: 'This is a button',
   *     buttonUrl1: 'https://assistant.google.com/',
   *
   *     buttonText2: 'This is a button',,
   *     buttonUrl2: 'https://assistant.google.com/',
   *
   *     buttonText3: 'This is a button',,
   *     buttonUrl3: 'https://assistant.google.com/',
   * });
   *
   * @param {string|Object} card response title string or an object representing a card response
   */
  constructor(card) {
    super();

    if (card === undefined || (typeof card === 'object' && !card.title)) {
      throw new Error('title string required by Card constructor');
    }
    if (typeof card === 'string') {
      this.title = card;
    } else if (typeof card === 'object') {

      this.title = card.title;
      this.text = card.text;
      this.imageUrl = card.imageUrl;

      this.buttonText1 = card.buttonText1;
      this.buttonUrl1 = card.buttonUrl1;

      this.buttonText2 = card.buttonText2;
      this.buttonUrl2 = card.buttonUrl2;

      this.buttonText3 = card.buttonText3;
      this.buttonUrl3 = card.buttonUrl3;

      if (
        typeof card.platform !== 'undefined' &&
        card.platform !== PLATFORMS.UNSPECIFIED
      ) {
        if (SUPPORTED_RICH_MESSAGE_PLATFORMS.indexOf(card.platform) < 0) {
          throw new Error(`Platform '${card.platform}' not supported.`);
        } else {
          this.platform = card.platform;
        }
      }
    }
  }

  /**
   * Set the title for a Card
   *
   * @example
   * let card = new Card();
   * card.setTitle('sample card title')
   *
   * @param {string} title containing the title content
   * @return {Card}
   */
  setTitle(title) {
    if (typeof title !== 'string') {
      throw new Error('setText requires a string of the text');
    }
    this.title = title;
    return this;
  }

  /**
   * Set the text for a Card
   *
   * @example
   * let card = new Card();
   * card.setText('sample card body text')
   *
   * @param {string} text containing the card body text content
   * @return {Card}
   */
  setText(text) {
    if (typeof text !== 'string') {
      throw new Error('setText requires a string of the text');
    }
    this.text = text;
    return this;
  }

  /**
   * Set the image for a Card
   *
   * @example
   * let card = new Card();
   * card.setImage('https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png');
   *
   * @param {string} imageUrl
   * @return {Card}
   */
  setImage(imageUrl) {
    if (typeof imageUrl !== 'string') {
      throw new Error('setImage requires a string of the image URL');
    }
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Set the button for a Card
   *
   * @example
   * let card = new Card();
   * card.setButton({
   *     text: 'button text',
   *     url: 'https://assistant.google.com/'
   * });
   *
   * @param {Object} button JSON configuration
   * @param {Object} options.text button text
   * @param {Object} options.url button link URL
   * @return {Card}
   */
  setButton1(button) {
    if ((!button.text && button.url) || (!button.url && button.text)) {
      throw new Error(
        `card button requires button title and url. \
\nUsage: setButton({text: \'button text\', url: \'http://yoururlhere.com\'}`
      );
    }
    this.buttonText1 = button.text;
    this.buttonUrl1 = button.url;
    return this;
  }
  setButton2(button) {
    if ((!button.text && button.url) || (!button.url && button.text)) {
      throw new Error(
        `card button requires button title and url. \
\nUsage: setButton({text: \'button text\', url: \'http://yoururlhere.com\'}`
      );
    }
    this.buttonText2 = button.text;
    this.buttonUrl2 = button.url;
    return this;
  }
  setButton3(button) {
    if ((!button.text && button.url) || (!button.url && button.text)) {
      throw new Error(
        `card button requires button title and url. \
\nUsage: setButton({text: \'button text\', url: \'http://yoururlhere.com\'}`
      );
    }
    this.buttonText3 = button.text;
    this.buttonUrl3 = button.url;
    return this;
  }

  /**
   * Get the v1 response object for the rich response
   * https://dialogflow.com/docs/reference/agent/message-objects
   *
   * @example
   * let richResponse = new RichResponse();
   * richResponse.getV1ResponseObject_(PLATFORMS.ACTIONS_ON_GOOGLE)
   *
   * @param {string} platform desired message object platform
   * @return {Object} v1 response object
   * @private
   */
  getV1ResponseObject_(platform) {
    // Check if response is platform specific
    if (this.platform && this.platform !== platform) {
      // if it is and is not for the specific platform return null
      return null;
    }

    //
    let response;
    if (platform === PLATFORMS.ACTIONS_ON_GOOGLE) {
      // If the platform is Actions on Google use a simple response
      response = {
        type: 'basic_card',
        platform: V2_TO_V1_PLATFORM_NAME[platform],
      };
      response.title = this.title;
      if (!this.text && !this.imageUrl) {
        response.formattedText = ' '; // AoG requires text or image in card
      }
      if (this.text) response.formattedText = this.text;
      if (this.imageUrl) {
        response.image = {};
        response.image.url = this.imageUrl;
        response.image.accessibilityText = 'accessibility text';
      }

      if (this.buttonText && this.buttonUrl) {
        response.buttons = [{openUrlAction: {}}];
        response.buttons[0].title = this.buttonText;
        response.buttons[0].openUrlAction.url = this.buttonUrl;
      }
    } else {
      response = {type: v1MessageObjectCard};
      response.title = this.title;
      if (this.text) response.subtitle = this.text;
      if (this.imageUrl) response.imageUrl = this.imageUrl;
      // this is required in the response even if there are no buttons for some reason
      if (platform === PLATFORMS.SLACK) response.buttons = [];

      response.card.buttons = [];
      if (this.buttonText1 && this.buttonUrl1) {
        response.card.buttons[0] = {};
        response.card.buttons[0].text = this.buttonText1;
        response.card.buttons[0].postback = this.buttonUrl1;
      }
      if (this.buttonText2 && this.buttonUrl2) {
        response.card.buttons[1] = {};
        response.card.buttons[1].text = this.buttonText2;
        response.card.buttons[1].postback = this.buttonUrl2;
      }
      if (this.buttonText3 && this.buttonUrl3) {
        response.card.buttons[2] = {};
        response.card.buttons[2].text = this.buttonText3;
        response.card.buttons[2].postback = this.buttonUrl3;
      }
      // response is the same for generic responses without the platform attribute
      // if the platform is not undefined or the platform is not unspecified
      if (SUPPORTED_RICH_MESSAGE_PLATFORMS.indexOf(platform) > -1) {
        response.platform = V2_TO_V1_PLATFORM_NAME[platform];
      }
    }
    return response;
  }

  /**
   * Get the v2 response object for the rich response
   * https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent.intents#Message
   *
   * @example
   * let richResponse = new RichResponse();
   * richResponse.getV2ResponseObject_(PLATFORMS.ACTIONS_ON_GOOGLE)
   *
   * @param {string} platform desired message object platform
   * @return {Object} v2 response object
   * @private
   */
  getV2ResponseObject_(platform) {

    // Check if response is platform specific
    if (this.platform && this.platform !== platform) {
      // if it is and is not for the specific platform return null
      return null;
    }

    let response;
    if (platform === PLATFORMS.ACTIONS_ON_GOOGLE) {
      // If the platform is Actions on Google use a basic card response
      response = {basicCard: {}};
      response.basicCard.title = this.title;
      response.platform = PLATFORMS.ACTIONS_ON_GOOGLE;
      if (this.text) response.basicCard.formattedText = this.text;
      if (this.imageUrl) {
        response.basicCard.image = {};
        response.basicCard.image.imageUri = this.imageUrl;
        response.basicCard.image.accessibilityText = 'accessibility text';
      }
      if (this.buttonText && this.buttonUrl) {
        response.basicCard.buttons = [{
          title: this.buttonText,
          openUriAction: {
            uri: this.buttonUrl,
          },
        }];
      }
    } else {

      response = {card: {}};
      response.card.title = this.title;
      if (this.text) response.card.subtitle = this.text;
      if (this.imageUrl) response.card.imageUri = this.imageUrl;

      response.card.buttons = [];
      if (this.buttonText1 && this.buttonUrl1) {
        response.card.buttons[0] = {};
        response.card.buttons[0].text = this.buttonText1;
        response.card.buttons[0].postback = this.buttonUrl1;
      }
      if (this.buttonText2 && this.buttonUrl2) {
        response.card.buttons[1] = {};
        response.card.buttons[1].text = this.buttonText2;
        response.card.buttons[1].postback = this.buttonUrl2;
      }
      if (this.buttonText3 && this.buttonUrl3) {
        response.card.buttons[2] = {};
        response.card.buttons[2].text = this.buttonText3;
        response.card.buttons[2].postback = this.buttonUrl3;
      }
      
      // response is the same for generic responses without the platform attribute
      // if the platform is not undefined or the platform is not unspecified
      if (SUPPORTED_RICH_MESSAGE_PLATFORMS.indexOf(platform) > -1) {
        response.platform = platform;
      }
    }
    return response;
  }
}

module.exports = Card;
