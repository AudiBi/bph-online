import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { authGuard } from './guards'
import Login from "@/views/auth/Login.vue"
import AppLayout from "@/layouts/AppLayout.vue"
import Dashboard from "@/views/Dashboard.vue"
import Accounts from "@/views/accounts/Accounts.vue"
import AccountDetails from "@/views/accounts/AccountDetails.vue"
import Transactions from "@/views/accounts/Transactions.vue"
import Statements from "@/views/Statements.vue"
import LocalTransfer from "@/views/transfers/LocalTransfer.vue"
import InternationalTransfer from "@/views/transfers/InternationalTransfer.vue"
import Beneficiaries from "@/views/beneficiaries/Beneficiaries.vue"
import AddBeneficiary from "@/views/beneficiaries/AddBeneficiary.vue"
import Bills from "@/views/payments/Bills.vue"
import MobileRechargeView from "@/views/payments/MobileRechargeView.vue"
import PaymentsHistory from "@/views/payments/PaymentsHistory.vue"
import Cards from "@/views/cards/Cards.vue"
import CardDetails from "@/views/cards/CardDetails.vue"
import CardSecurity from "@/views/cards/CardSecurity.vue"
import History from "@/views/History.vue"
import Localiser from "@/views/Localiser.vue"
import Contact from "@/views/Contact.vue"
import Investments from "@/views/investments/Investments.vue"
import NewInvestment from "@/views/investments/NewInvestment.vue"
import NewSavingGoal from "@/views/savings/NewSavingGoal.vue"
import Savings from "@/views/savings/Savings.vue"
import CreditSimulation from "@/views/credits/CreditSimulation.vue"
import CreditApplication from "@/views/credits/CreditApplication.vue"
import CreditStatus from "@/views/credits/CreditStatus.vue"
import Notifications from "@/views/notifications/Notifications.vue"
import NotificationSettings from "@/views/notifications/NotificationSettings.vue"
import Chat from "@/views/support/Chat.vue"
import RDV from "@/views/support/RDV.vue"
import Tickets from "@/views/support/Tickets.vue"
import NewTicket from "@/views/support/NewTicket.vue"
import Profile from "@/views/Profile.vue"
import ActivityLog from "@/views/ActivityLog.vue"
import Security from "@/views/Security.vue"
import CardPaymentsView from "@/views/payments/CardPaymentsView.vue"
import DepositHistoryView from "@/views/deposit/DepositHistoryView.vue"
import OtherOperationsView from "@/views/operations/OtherOperationsView.vue"

const routes: Array<RouteRecordRaw> = [
  // 🔓 Public
  {
    path: "/",
    name: "Login",
    component: Login
  },

  // 🔐 Client (avec layout)
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "accounts",
        name: "Accounts",
        component: Accounts
      },
      { 
        path: '/accounts/:id', 
        name: 'AccountDetails', 
        component: AccountDetails, 
        props: true 
      },
      {
        path: "/accounts/:id/transactions",
        name: "Transactions",
        component: Transactions,
        props: true
      },
      {
        path: "/accounts/:id/statements",
        name: "Statements",
        component: Statements,
        props: true
      },
      {
        path: "/transfers/local",
        name: "LocalTransfer",
        component: LocalTransfer
      },
      {
        path: "/transfers/international",
        name: "InternationalTransfer",
        component: InternationalTransfer
      },

      // Bénéficiaires
      {
        path: "/beneficiaries",
        name: "Beneficiaries",
        component: Beneficiaries
      },
      {
        path: "/beneficiaries/new",
        name: "AddBeneficiary",
        component: AddBeneficiary
      },
      {
        path: "/deposits",
        name: "DepositHistoryView",
        component: DepositHistoryView
      },
      {
        path: "payments/card",
        name: "CardPaymentsView",
        component: CardPaymentsView
      },
      {
        path: "payments/bills",
        name: "Bills",
        component: Bills
      },
      {
        path: "payments/mobile",
        name: "MobileRechargeView",
        component: MobileRechargeView
      },
      {
        path: "payments/history",
        name: "PaymentsHistory",
        component: PaymentsHistory
      },
       {
        path: "/cards",
        name: "Cards",
        component: Cards,
        meta: {
          title: "Mes cartes"
        }
      },
      {
        path: "/cards/:id",
        name: "CardDetails",
        component: CardDetails,
        props: true,
        meta: {
          title: "Détails de la carte"
        }
      },
      {
        path: "/cards/:id/security",
        name: "CardSecurity",
        component: CardSecurity,
        props: true,
        meta: {
          title: "Sécurité de la carte"
        }
      },
      {
        path: "/credits/simulate",
        name: "CreditSimulation",
        component: CreditSimulation
      },
      {
        path: "/credits/apply",
        name: "CreditApplication",
        component: CreditApplication
      },
      {
        path: "/processes",
        name: "CreditStatus",
        component: CreditStatus
      },
      {
        path: "/savings",
        name: "Savings",
        component: Savings
      },
      {
        path: "/savings/goals/new",
        name: "NewSavingGoal",
        component: NewSavingGoal
      },
      {
        path: "/investments/",
        name: "Investments",
        component: Investments
      },
      {
        path: "/investments/new",
        name: "NewInvestment",
        component: NewInvestment
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "/notifications/settings",
        name: "NotificationSettings",
        component: NotificationSettings
      },
       {
        path: "/support/chat",
        name: "Chat",
        component: Chat
      },
       {
        path: "/support/tickets",
        name: "Tickets",
        component: Tickets
      },
       {
        path: "/support/tickets/new",
        name: "NewTicket",
        component: NewTicket
      },
       {
        path: "/support/appointments",
        name: "RDV",
        component: RDV
      },
       {
        path: "/settings/profile",
        name: "Profile",
        component: Profile
      },
       {
        path: "/settings/security",
        name: "Security",
        component: Security
      },
       {
        path: "/settings/activity",
        name: "ActivityLog",
        component: ActivityLog
      },
      {
        path: "/other-operations",
        name: "OtherOperationsView",
        component: OtherOperationsView
      },
      {
        path: "history",
        name: "History",
        component: History
      },
      {
        path: "localiser",
        name: "Localiser",
        component: Localiser
      },
      {
        path: "contact",
        name: "Contact",
        component: Contact
      },
    ]
  },

  {
    path: '/business',
    beforeEnter: authGuard,
    component: () => import('@/views/business/BusinessDashboard.vue'),
    children: [
      { path: 'open-account', component: () => import('@/views/business/BusinessAccountOpen.vue') },
      { path: 'payroll', component: () => import('@/views/business/PayrollView.vue') },
      { path: 'pos', component: () => import('@/views/business/PosView.vue') },
      { path: 'financing', component: () => import('@/views/business/FinancingView.vue') }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
