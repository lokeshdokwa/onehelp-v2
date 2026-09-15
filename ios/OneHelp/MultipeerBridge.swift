import Foundation
import MultipeerConnectivity
import React

@objc(MultipeerBridge)
class MultipeerBridge: NSObject {
  
  private var peerID: MCPeerID!
  private var session: MCSession!
  private var advertiser: MCNearbyServiceAdvertiser!
  private var browser: MCNearbyServiceBrowser!
  
  @objc
  func startAdvertising(_ serviceType: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    self.peerID = MCPeerID(displayName: UIDevice.current.name)
    self.session = MCSession(peer: self.peerID, securityIdentity: nil, encryptionPreference: .required)
    self.advertiser = MCNearbyServiceAdvertiser(peer: self.peerID, discoveryInfo: nil, serviceType: serviceType)
    self.advertiser.startAdvertisingPeer()
    resolve(true)
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
