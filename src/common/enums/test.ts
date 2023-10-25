export enum TEST_ID {
  // layout
  LAYOUT_HEADER = 'layout/header',
  // side nav
  SIDE_NAV_NOTIFICATIONS = 'sidenav/notifications',
  SIDE_NAV_MY_PAGE = 'sidenav/my-page',
  SIDE_NAY_WRITE_BUTTON = 'sidenav/write-button',
  // digests
  DIGEST_ARTICLE_CARD = 'digest/article/card',
  DIGEST_ARTICLE_FEED = 'digest/article/feed',
  DIGEST_ARTICLE_LIST = 'digest/article/list',
  DIGEST_ARTICLE_FEED_FOOTER_PIN = 'digest/article/feed/footer/pin',
  DIGEST_ARTICLE_NOTICE = 'digest/article/notice',
  DIGEST_ARTICLE_SIDEBAR = 'digest/article/sidebar',
  DIGEST_ARTICLE_TITLE = 'digest/article/title',
  DIGEST_USER_MINI = 'digest/user/mini',
  DIGEST_USER_MINI_DISPLAY_NAME = 'digest/user/mini/display-name',
  DIGEST_USER_MINI_USER_NAME = 'digest/user/mini/user-name',
  DIGEST_USER_PLAIN = 'digest/user/plain',
  DIGEST_USER_RICH = 'digest/user/rich',
  DIGEST_USER_RICH_DISPLAY_NAME = 'digest/user/rich/display-name',
  DIGEST_USER_VERBOSE = 'digest/user/verbose',
  DIGEST_TAG_FEED = 'digest/tag/feed',
  DIGEST_TAG_RICH = 'digest/tag/rich',
  DIGEST_TAG_SIDEBAR = 'digest/tag/sidebar',
  DIGEST_COLLECTION_FEED = 'digest/collection/feed',
  // dialogs
  DIALOG_AUTH = 'dialog/auth',
  // search
  SEARCH_RESULTS_ITEM = 'search/results/item',
  // drafts
  DRAFTS_RESPONSE_ALLOW = 'drafts/response/allow',
  DRAFTS_RESPONSE_DISALLOW = 'drafts/response/disallow',
  // article
  ARTICLE_SUMMARY = 'article/summary',
  ARTICLE_CONTENT = 'article/content',
  ARTICLE_COLLECTION = 'article/collection',
  ARTICLE_TAGS = 'article/tags',
  ARTICLE_LICENSE = 'article/license',
  ARTICLE_SUPPORT_SUPPORT_BUTTON = 'article/support/support-button',
  ARTICLE_SUPPORT_REQUEST = 'article/support/request',
  ARTICLE_SUPPORT_REPLY = 'article/support/reply',
  ARTICLE_APPRECIATION_TOTAL = 'article/appreciation/total',
  ARTICLE_TOOLBAR = 'article/toolbar',
  ARTICLE_BOOKMARK = 'article/bookmark',
  ARTICLE_COMMENT_FEED = 'article/comment/feed',
  // payto
  PAY_TO_CURRENCY_CHOICE = 'payto/currency-choice',
  // comment
  COMMENT_CONETNT = 'comment/content',
  // notification:components
  NOTICE_USER_DISPLAY_NAME = 'notice/user/display-name',
  NOTICE_ARTICLE_TITLE = 'notice/article/title',
  NOTICE_COMMENT_CONTENT = 'notice/comment/content',
  NOTICE_PAYMENT_RECEIVE_DONATION_AMOUNT = 'notice/payment-receive-donation/amount',
  // notification:types
  NOTICE_USER_NEW_FOLLOWER = 'notice/user-new-follower',
  NOTICE_ARTICLE_NEW_COLLECTED = 'notice/article-new-collected',
  NOTICE_ARTICLE_PUBLISHED = 'notice/article-published',
  NOTICE_ARTICLE_MENTIONED_YOU = 'notice/article-mentioned-you',
  NOTICE_ARTICLE_NEW_SUBSCRIBER = 'notice/article-new-subscriber',
  NOTICE_ARTICLE_NEW_APPRECIATION = 'notice/article-new-appreciation',
  NOTICE_REVISED_ARTICLE_PUBLISHED = 'notice/revised-article-published',
  NOTICE_REVISED_ARTICLE_NOT_PUBLISHED = 'notice/revised-article-not-published',
  NOTICE_CIRCLE_NEW_ARTICLE = 'notice/circle-new-article',
  NOTICE_ARTICLE_TAG_ADDED = 'notice/article-tag-added',
  NOTICE_ARTICLE_TAG_REMOVED = 'notice/article-tag-removed',
  NOTICE_ARTICLE_TAG_UNSELECTED = 'notice/article-tag-unselected',
  NOTICE_COMMENT_NEW_REPLY = 'notice/comment-new-reply',
  NOTICE_COMMENT_MENTIONED_YOU = 'notice/comment-mentioned-you',
  NOTICE_COMMENT_PINNED = 'notice/comment-pinned',
  NOTICE_ARTICLE_NEW_COMMENT = 'notice/article-new-comment',
  NOTICE_SUBSCRIBED_ARTICLE_NEW_COMMENT = 'notice/subscribed-article-new-comment',
  NOTICE_CIRCLE_NEW_BROADCAST = 'notice/circle-new-broadcast',
  NOTICE_TAG_ADOPTION = 'notice/tag-adoption',
  NOTICE_TAG_LEAVE = 'notice/tag-leave',
  NOTICE_TAG_ADD_EDITOR = 'notice/tag-add-editor',
  NOTICE_TAG_LEAVE_EDITOR = 'notice/tag-leave-editor',
  NOTICE_PAYMENT_PAYOUT = 'notice/payment-payout',
  NOTICE_PAYMENT_RECEIVE_DONATION = 'notice/payment-receive-donation',
  NOTICE_CIRCLE_NEW_FOLLOWER = 'notice/cirlce-new-follower',
  NOTICE_CIRCLE_NEW_SUBSCRIBER = 'notice/cirlce-new-subscriber',
  NOTICE_CIRCLE_NEW_UNSUBSCRIBER = 'notice/cirlce-new-unsubscriber',
  NOTICE_CIRCLE_INVITATION = 'notice/circle-invitation',
  NOTICE_CIRCLE_NEW_BROADCAST_COMMENTS = 'notice/circle-new-broadcast-comments',
  NOTICE_CIRCLE_NEW_DISCUSSION_COMMENTS = 'notice/circle-new-discussion-comments',
  NOTICE_CRYPTO_WALLET_AIRDROP = 'notice/crypto-wallet-airdrop',
  NOTICE_CRYPTO_WALLET_CONNECTED = 'notice/crypto-wallet-connected',
  NOTICE_OFFICIAL_ANNOUNCEMENT = 'notice/official-announcement',
  // me
  ME_WALLET_TRANSACTIONS_ITEM = 'me/wallet/transactions/item',
  ME_WALLET_TRANSACTIONS_ITEM_AMOUNT = 'me/wallet/transactions/item/amount',
  // user profile
  ASIDE_USER_PROFILE = 'aside-user-profile',
  ASIDE_USER_PROFILE_FOLLOWERS_COUNT = 'aside-user-profile/followers/count',
  USER_PROFILE = 'user-profile',
  USER_PROFILE_DISPLAY_NAME = 'user-profile/display-name',
  USER_PROFILE_USER_NAME = 'user-profile/user-name',
  USER_PROFILE_FOLLOWERS_COUNT = 'user-profile/followers/count',
  USER_PROFILE_BIO = 'user-profile/bio',
  USER_PROFILE_PIN_BOARD = 'user-profile/pin-board',
  USER_PROFILE_PIN_BOARD_PINNED_WORK = 'user-profile/pin-board/pinned-work',
  USER_PROFILE_PIN_BOARD_UNPIN_BUTTON = 'user-profile/pin-board/unpin-button',

  // Book
  BOOK_TITLE = 'book/title',

  // Editor
  EDITOR_SEARCH_SELECT_FORM_DIALOG_ADD_BUTTON = 'editor/search-select-form/dialog/add-button',

  // Icons
  ICON_SPINNER = 'icon/spinner',

  // Avatar
  AVATAR = 'avatar',
  AVATAR_CIVIC_LIKER = 'avatar/civic-liker',
  AVATAR_ARCHITECT = 'avatar/architect',
  AVATAR_CIVIC_ARCHITECT = 'avatar/civic-architect',
  AVATAR_LOGBOOK = 'avatar/logbook',

  // misc
  RESPONSIVE_IMG = 'responsive-img',
  SPINNER = 'spinner',
}
