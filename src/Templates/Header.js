import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProfileIcon from '../Components/AvatarIcon'
import HeaderContent from '../Components/HeaderAnimation'
import Lamp from '../Components/Lamp'
import { Lights } from '../Components/Lights'
import PageTitle from '../Components/PageTitle'
import { LampContext } from '../Utility/LampContext'
import LightScenes from './LightScenes'

//import States
import { StateContext } from '../Hooks/StateContext'

const Header = () => {
  const { rooms, setRooms } = useContext(StateContext)
  const { lampColor, lightAmount } = useContext(LampContext)

  /*   const { name } = rooms

  loaded && console.log(rooms) */

  return (
    <header className="p-6 pt-[50px] pb-0 relative">
      <Routes>
        <Route
          path="/"
          element={
            <HeaderContent>
              <PageTitle title="Control Panel" />
              <ProfileIcon />
            </HeaderContent>
          }
        />
        {rooms && (
          <Route
            path="/:id"
            element={
              <HeaderContent>
                <div>
                  <PageTitle title={rooms.name} />
                  <Lights amount={rooms.lights.length} />
                  <LightScenes />
                </div>
                <Lamp color={lampColor} />
              </HeaderContent>
            }
          />
        )}
      </Routes>
    </header>
  )
}

export default Header
