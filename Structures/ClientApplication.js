const ApplicationCommandManager = require("../Managers/ApplicationCommandManager");
const ApplicationFlags = require("../Util/ApplicationFlags");
const Permissions = require("../Util/Permissions");
const Base = require("../Base/base");
const Team = require("./Team");
/* It's a class that represents a Discord application */
class ClientApplication extends Base {
  /**
   * It's a constructor for the Application class.
   * @param [data] - {
   * @param client - DiscordClient
   */
  constructor(data = {}, client) {
    super(client);
    this.id = data.id ?? null;
    this.name = data.name ?? null;
    this.icon = data.icon ?? null;
    this.description = data.description ?? null;
    this.rpcOrigins = data.rpc_origins ?? null;
    this.public = data.bot_public ?? null;
    this.requireCodeGrant = data.bot_require_code_grant ?? null;
    this.termsOfService = data.terms_of_service_url ?? null;
    this.privacyPolicy = data.privacy_policy_url ?? null;
    this.owner = this.client.users._add(data.owner) ?? null;
    this.summary = data.summary ?? null;
    this.verifyKey = data.verify_key ?? null;
    this.team = data.team ? new Team(data.team, this.client) : null;
    this.guildId = data.guild_id ?? null;
    this.primarySkuId = data.primary_sku_id ?? null;
    this.slug = data.slug ?? null;
    this.cover = data.cover_image ?? null;
    this.flags = new ApplicationFlags(data.flags ? BigInt(data.flags) : 0n);
    this.installParams = data.install_params
      ? {
          scopes: data.install_params.scopes,
          permissions: new Permissions(data.install_params.permissions),
        }
      : null;
    this.customInstallURL = data.custom_install_url ?? null;
  }

  /**
   * It fetches the application information from the Discord API and returns it.
   * @returns The client.application is being returned.
   */
  async fetch() {
    const application = await this.client.api.get(`${this.client.root}/oauth2/applications/@me`);
    this.client.application = new this.constructor(application, this.client);
    return this.client.application;
  }

  /**
   * It returns a new instance of the ApplicationCommandManager class, which is a class that is defined
   * in the file ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in the file
   * ApplicationCommandManager.js.
   *
   * The ApplicationCommandManager class is a class that is defined in
   * @returns A new instance of the ApplicationCommandManager class.
   */
  get commands() {
    return new ApplicationCommandManager(this.client);
  }

  /**
   * "If the application has an icon, return the icon URL, otherwise return null."
   *
   * The function takes an optional parameter, options, which is an object. If options is not provided,
   * it defaults to an empty object.
   *
   * The function then checks if the application has an icon. If it does, it returns the icon URL,
   * otherwise it returns null.
   *
   * The icon URL is generated by the client.cdn.ApplicationIcon function. This function takes the icon
   * ID, the dynamic flag, the size, the format, and the application ID.
   *
   * The dynamic flag is true if the icon is animated, otherwise it's false.
   *
   * The size is the size of the icon in pixels.
   *
   * The format is the image format, either "png" or "gif".
   *
   * The application ID is the ID of the application.
   *
   * The client.cdn
   * @param [options] - The options for the icon.
   * @returns The iconURL method returns the URL of the application's icon.
   */
  iconURL(options = {}) {
    if (!this.icon) return null;
    return this.client.cdn.ApplicationIcon(this.icon, options.dynamic, options.size, options.format, this.id);
  }
}

module.exports = ClientApplication;
