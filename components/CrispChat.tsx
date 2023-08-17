"use client"

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("decef658-c87b-4de9-b547-aeef04398849");
  }, []);

  return null;
}