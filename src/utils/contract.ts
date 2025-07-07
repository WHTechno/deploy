import { ethers } from 'ethers';
import abi from './abi.json';

const CONTRACT_ADDRESS = '0x483439ceb4eec27856cb2b8cae56ea3c51ca44ac';

export async function writeContract(fn: string, args: any[]) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const tx = await contract[fn](...args);
  await tx.wait();
}

export async function readContract(fn: string, args: any[]) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  return await contract[fn](...args);
}
