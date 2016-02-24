## µTP-based Data Transfer Protocol (UDTP)

UDTP is high level [µTP](http://www.bittorrent.org/beps/bep_0029.html)-based Data Transfer Protocol. µTP provides a TCP-like implementation of [LEDBAT](http://datatracker.ietf.org/wg/ledbat/charter/) documented as a BitTorrent extension in [BEP-29](http://www.bittorrent.org/beps/bep_0029.html).

UDTP is mainly designed for peer-to-peer connections, but it can be used in a client-server architecture.

This repo contains UDTP specifications and a Node.js implementation of the protocol built on top of [libutp](https://github.com/bittorrent/libutp).


### Motivation
The way how almost everyone share files over the Internet is not optimized. The most common file transfer applications existing today are based on [client-server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)-client architecture. With this approach, a file sent from client A to client B, need to pass from server C. The mainly disadvantage of this approach is high latency, which implies slow transfer speed.

As well, generally architectures of this type are using [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). TCP is a connection-oriented protocol, which means a connection is established and maintained until the application programs at each end have finished exchanging messages. TCP implements a congestion control and reliability control mechanisms. Unfortunately TCP is not well suited for transferring large volumetric datasets over wide area networks due to the long latency introduced by its reliability control mechanism.

File transfer applications based on a [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) architectures are definitely a better alternative. With this approach, a file sent can be sent directly from client A to a B, reducing the latency and increasing the transfer speed. However, P2P don't play very well with [Network Address Translation](https://en.wikipedia.org/wiki/Network_address_translation) (NAT). NAT causes well-known difficulties for P2P communications, since the peers involved may not be reachable at any globally valid IP address. Fortunately several NAT traversal techniques are known, commonly known as hole punching. Because only 64% of NATs support hole punching for TCP streams while 82% of these support hole punching for [UDP]() [1], as well because UDP can transfer data at a much higher speed than TCP does, breaking the Data Transfer Bottleneck, the usage of µTP as primary peer-to-peer transmission protocol, an open UDP-based variant of used by the BitTorrent peer-to-peer file sharing protocol, mitigates poor latency and other congestion control issues found in TCP.

µTP uses Low Extra Delay Background Transport ([LEDBAT](https://en.wikipedia.org/wiki/LEDBAT)), a congestion control algorithm which aims to decrease the latency caused by applications using the protocol while maximizing bandwidth when latency is not excessive.

A µTP-based Data Transfer Protocol (UDTP) is presented with [this document](protocol.md), and a [Node.js](https://nodejs.org/en/) implementation is developed.


### Roadmap

#### 0.0.0
- Define a very basic first version of the protocol
