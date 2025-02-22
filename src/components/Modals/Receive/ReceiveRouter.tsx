import type { Asset } from '@shapeshiftoss/asset-service'
import type { AccountId } from '@shapeshiftoss/caip'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { ReceiveInfo } from 'components/Modals/Receive/ReceiveInfo'
import { SelectAssetRouter } from 'components/SelectAssets/SelectAssetRouter'

import { ReceiveRoutes } from './ReceiveCommon'

type ReceiveRouterProps = {
  asset: Asset
  accountId?: AccountId
}
export const ReceiveRouter = ({ asset, accountId }: ReceiveRouterProps) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(asset)
  const location = useLocation()
  const history = useHistory()

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset)
    history.push(ReceiveRoutes.Info)
  }

  const handleSelectBack = () => {
    history.push(ReceiveRoutes.Info)
  }

  useEffect(() => {
    if (!selectedAsset && !asset) {
      history.push(ReceiveRoutes.Select)
    } else if (asset) {
      setSelectedAsset(asset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.key}>
        <Route path={ReceiveRoutes.Info}>
          {selectedAsset ? <ReceiveInfo asset={selectedAsset} accountId={accountId} /> : null}
        </Route>
        <Route path={ReceiveRoutes.Select}>
          <SelectAssetRouter onBack={handleSelectBack} onClick={handleAssetSelect} />
        </Route>
      </Switch>
    </AnimatePresence>
  )
}
