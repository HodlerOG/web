import { createSlice } from '@reduxjs/toolkit'
import type { SupportedFiatCurrencies } from '@shapeshiftoss/market-service'
import { getConfig } from 'config'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { simpleLocale } from 'lib/browserLocale'

dayjs.extend(localizedFormat)

export type FeatureFlags = {
  OsmosisSend: boolean
  OsmosisStaking: boolean
  OsmosisSwap: boolean
  OsmosisLP: boolean
  ThorSwap: boolean
  Pendo: boolean
  IdleFinance: boolean
  Axelar: boolean
  Zendesk: boolean
  Yat: boolean
  WalletConnectToDapps: boolean
  DashboardBreakdown: boolean
  Wherever: boolean
  FiatPopup: boolean
  EligibleEarn: boolean
}

export type Flag = keyof FeatureFlags

export enum CurrencyFormats {
  DotDecimal = 'en-US',
  CommaDecimal = 'fr-FR',
}

export type Preferences = {
  featureFlags: FeatureFlags
  selectedLocale: string
  balanceThreshold: string
  selectedCurrency: SupportedFiatCurrencies
  currencyFormat: CurrencyFormats
  showWelcomeModal: boolean
}

const initialState: Preferences = {
  featureFlags: {
    OsmosisSend: getConfig().REACT_APP_FEATURE_OSMOSIS_SEND,
    OsmosisStaking: getConfig().REACT_APP_FEATURE_OSMOSIS_STAKING,
    OsmosisSwap: getConfig().REACT_APP_FEATURE_OSMOSIS_SWAP,
    OsmosisLP: getConfig().REACT_APP_FEATURE_OSMOSIS_LP,
    ThorSwap: getConfig().REACT_APP_FEATURE_THOR_SWAP,
    Pendo: getConfig().REACT_APP_FEATURE_PENDO,
    IdleFinance: getConfig().REACT_APP_FEATURE_IDLE,
    Axelar: getConfig().REACT_APP_FEATURE_AXELAR,
    Zendesk: getConfig().REACT_APP_FEATURE_ZENDESK,
    Yat: getConfig().REACT_APP_FEATURE_YAT,
    WalletConnectToDapps: getConfig().REACT_APP_FEATURE_WALLET_CONNECT_TO_DAPPS,
    DashboardBreakdown: getConfig().REACT_APP_DASHBOARD_BREAKDOWN,
    Wherever: getConfig().REACT_APP_FEATURE_WHEREVER,
    FiatPopup: getConfig().REACT_APP_FEATURE_FIAT_POPUP,
    EligibleEarn: getConfig().REACT_APP_FEATURE_ELIGIBLE_EARN,
  },
  selectedLocale: simpleLocale(),
  balanceThreshold: '0',
  selectedCurrency: 'USD',
  currencyFormat: CurrencyFormats.DotDecimal,
  showWelcomeModal: false,
}

export const preferences = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    clearFeatureFlags: state => {
      state.featureFlags = initialState.featureFlags
    },
    setFeatureFlag(state, { payload }: { payload: { flag: keyof FeatureFlags; value: boolean } }) {
      state.featureFlags[payload.flag] = payload.value
    },
    setSelectedLocale(state, { payload }: { payload: { locale: string } }) {
      state.selectedLocale = payload.locale
    },
    setSelectedCurrency(state, { payload }: { payload: { currency: SupportedFiatCurrencies } }) {
      state.selectedCurrency = payload.currency
    },
    setBalanceThreshold(state, { payload }: { payload: { threshold: string } }) {
      state.balanceThreshold = payload.threshold
    },
    setCurrencyFormat(state, { payload }: { payload: { currencyFormat: CurrencyFormats } }) {
      state.currencyFormat = payload.currencyFormat
    },
    setWelcomeModal(state, { payload }: { payload: { show: boolean } }) {
      state.showWelcomeModal = payload.show
    },
  },
})
