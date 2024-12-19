Feature: Navigate to different sections

  Scenario: Navigate to the About Section on a Desktop PC
    Given the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the following nav button
      | nav_button |
      | #navAbout  |
    Then the user is navigated to the following section
      | section_title | section_selector | route   |
      | Overview.     | app-about        | /#about |

  Scenario: Navigate to the Work Section on a Desktop PC
    Given the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the following nav button
      | nav_button |
      | #navWork   |
    Then the user is navigated to the following section
      | section_title | section_selector | route  |
      | Experience.   | app-work         | /#work |

  Scenario: Navigate to the Contact Section on a Desktop PC
    Given the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the following nav button
      | nav_button  |
      | #navContact |
    Then the user is navigated to the following section
      | section_title | section_selector | route     |
      | Contact Me.   | app-contact      | /#contact |

  Scenario: Navigate to the Home Section on a Desktop PC
    Given the user is on the following section
      | section_title | section_selector | route     |
      | Contact Me.   | app-contact      | /#contact |
    When the user clicks on the following nav button
      | nav_button                   |
      | #logoNameOccupationContainer |
    Then the user is navigated to the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |

  Scenario: Navigate to the About Section on a Mobile Device
    Given the user is using a mobile device
    And the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the dropdown menu
    And the user clicks on the following nav button
      | nav_button     |
      | #aboutMenuItem |
    Then the user is navigated to the following section
      | section_title | section_selector | route   |
      | Overview.     | app-about        | /#about |

  Scenario: Navigate to the Work Section on a Mobile Device
    Given the user is using a mobile device
    And the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the dropdown menu
    And the user clicks on the following nav button
      | nav_button    |
      | #workMenuItem |
    Then the user is navigated to the following section
      | section_title | section_selector | route  |
      | Experience.   | app-work         | /#work |

  Scenario: Navigate to the Contact Section on a Mobile Device
    Given the user is using a mobile device
    And the user is on the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
    When the user clicks on the dropdown menu
    And the user clicks on the following nav button
      | nav_button       |
      | #contactMenuItem |
    Then the user is navigated to the following section
      | section_title | section_selector | route     |
      | Contact Me.   | app-contact      | /#contact |

  Scenario: Navigate to the Home Section on a Mobile Device
    Given the user is using a mobile device
    And the user is on the following section
      | section_title | section_selector | route     |
      | Contact Me.   | app-contact      | /#contact |
    When the user clicks on the following nav button
      | nav_button                   |
      | #logoNameOccupationContainer |
    Then the user is navigated to the following section
      | section_title | section_selector | route |
      | Hi, I'm Manu  | app-home         | /     |
