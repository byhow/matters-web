import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { authedTest, login, logout } from './helpers'

test.describe('Authentication', () => {
  test('can login in homepage dialog', async ({ page, isMobile }) => {
    await page.goto('/')

    // Expect homepage has "Enter" button
    let enterButton
    if (isMobile) {
      enterButton = page.getByRole('link', { name: 'Enter' })
    } else {
      enterButton = page.getByRole('button', { name: 'Enter' })
    }
    await expect(enterButton).toBeVisible()

    // Expect clicking the "Enter" button will open the <UniversalAuthDialog>
    await enterButton.click()
    if (isMobile) {
      await expect(page).toHaveTitle('Enter - Matters')
    } else {
      const authDialog = page.getByTestId(TEST_ID.DIALOG_AUTH)
      await expect(authDialog.first()).toBeVisible()
    }

    await login({ page, fillMode: true, waitForNavigation: true })
    await expect(page).toHaveURL('/')

    // Expect homepage has "Notification" button on the left side
    if (isMobile) {
      await expect(page.getByTestId(TEST_ID.NAV_NOTIFICATIONS)).toBeVisible()
    } else {
      await expect(
        page.getByRole('link', { name: 'Notifications' })
      ).toBeVisible()
    }
  })

  test('can login in login page', async ({ page, isMobile }) => {
    await login({ page, waitForNavigation: true })
    await expect(page).toHaveURL('/')

    // Expect homepage has "Notification" button on the left side
    if (isMobile) {
      await expect(page.getByTestId(TEST_ID.NAV_NOTIFICATIONS)).toBeVisible()
    } else {
      await expect(
        page.getByRole('link', { name: 'Notifications' })
      ).toBeVisible()
    }
  })

  authedTest(
    'can login and logout with worker-scoped fixtures',
    async ({ alicePage: page, isMobile }) => {
      await page.goto('/')

      // [Logged-in] Expect homepage has "Notification" button on the left side
      if (isMobile) {
        await expect(page.getByTestId(TEST_ID.NAV_NOTIFICATIONS)).toBeVisible()
      } else {
        await expect(
          page.getByRole('link', { name: 'Notifications' })
        ).toBeVisible()
      }

      // Logout
      await logout({ page, isMobile })

      // [Logged-out] Expect homepage has "Enter" button
      let enterButton
      if (isMobile) {
        enterButton = page.getByRole('link', { name: 'Enter' })
      } else {
        enterButton = page.getByRole('button', { name: 'Enter' })
      }
      await expect(enterButton).toBeVisible()
    }
  )
})
